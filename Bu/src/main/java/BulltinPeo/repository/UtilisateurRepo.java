package BulltinPeo.repository;

import BulltinPeo.entity.UtilisateurEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtilisateurRepo extends JpaRepository<UtilisateurEntity,Integer> {


    Optional<UtilisateurEntity> findByEmail(String email);
}
