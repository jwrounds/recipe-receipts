package my.projects.recipereceipts.repository;

import my.projects.recipereceipts.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{'email' : ?0}")
    Optional<User> findByEmail(String email);

    @Query("{'username' : ?0}")
    Optional<User> findByUsername(String username);

    @Query(value = "{'email' : ?0}", exists = true)
    boolean existsByEmail(String email);

    @Query(value = "{'username' : ?0}", exists = true)
    boolean existsByUsername(String username);
}
