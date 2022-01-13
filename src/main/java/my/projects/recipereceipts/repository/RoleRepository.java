package my.projects.recipereceipts.repository;

import my.projects.recipereceipts.model.Role;
import my.projects.recipereceipts.model.ERole;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
