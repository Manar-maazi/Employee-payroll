package BulltinPeo.repository;


import BulltinPeo.entity.EmpEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpRepository extends JpaRepository <EmpEntity, Integer> {

}
