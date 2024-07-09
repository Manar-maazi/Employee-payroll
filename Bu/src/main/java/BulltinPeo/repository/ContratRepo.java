package BulltinPeo.repository;

import BulltinPeo.entity.EntityContrat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContratRepo extends JpaRepository <EntityContrat ,Integer> {
}
