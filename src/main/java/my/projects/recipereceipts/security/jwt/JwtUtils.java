package my.projects.recipereceipts.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import my.projects.recipereceipts.security.authentication.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.util.Date;

public class JwtUtils {

   @Autowired
   private JwtConfig jwtConfig;

   private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

   private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtConfig.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
   }

    public String generateJwtToken(Authentication authentication) {

        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();

        return Jwts.builder()
            .setSubject((userPrincipal.getUsername()))
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtConfig.getTokenExpirationMs()))
            .signWith(getSigningKey())
            .compact();
    }

    public String getUsernameFromJwt(String token) {
        JwtParser parser = Jwts.parserBuilder().setSigningKey(jwtConfig.getSecretKey()).build();
        return parser.parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwt(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtConfig.getSecretKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException error) {
            logger.error("JWT signature invalid: {}", error.getMessage());
        } catch (MalformedJwtException error) {
            logger.error("JWT token invalid: {}", error.getMessage());
        } catch (ExpiredJwtException error) {
            logger.error("JWT token expired: {}", error.getMessage());
        } catch (UnsupportedJwtException error) {
            logger.error("JWT token unsupported: {}", error.getMessage());
        } catch (IllegalArgumentException error) {
            logger.error("JWT claims string empty: {}", error.getMessage());
        }

        return false;
    }
}
