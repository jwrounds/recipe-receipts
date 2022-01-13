package my.projects.recipereceipts.service;
import my.projects.recipereceipts.security.authentication.CustomUserDetails;
import my.projects.recipereceipts.model.User;
import my.projects.recipereceipts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Cannot find username!"));
        return CustomUserDetails.build(user);
    }

    public void addNewUser(User user) {
        String username = user.getUsername();
        String userEmail = user.getEmail();
        String userPassword = user.getPassword();

        if (userRepository.existsByEmail(userEmail)) {
            throw new RuntimeException(
                String.format("An account with email %s already exists!", userEmail));
        }

        User newUser = new User(username, userEmail, userPassword);
        userRepository.insert(newUser);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).
            orElseThrow(() -> new RuntimeException(
                String.format("Cannot find user by email %s!", email)));
    }

    public void updateUser(User user) {
        User savedUser = userRepository.findById(user.getId()).
            orElseThrow(() -> new RuntimeException(
                String.format("Cannot find user by id %s!", user.getId())));

        savedUser.setUsername(user.getUsername());
        savedUser.setEmail(user.getEmail());
    }
}
