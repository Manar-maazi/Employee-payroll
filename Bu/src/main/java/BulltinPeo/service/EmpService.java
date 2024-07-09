package BulltinPeo.service;

import BulltinPeo.dto.EmpDto;

import BulltinPeo.entity.EmpEntity;
import BulltinPeo.repository.EmpRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmpService {
    @Autowired
    EmpRepository emprepo;

    public List<EmpDto> getAllEmployees() {
         List<EmpEntity> empList = this.emprepo.findAll();
         List<EmpDto> dtoList = new ArrayList<>();
         for (EmpEntity emp : empList) {
             dtoList.add(EmpDto.FromEntitytoDTO(emp));
         }
         return dtoList;
    }

    public EmpDto getEmpById(Integer id){
        Optional<EmpEntity> emp = this.emprepo.findById(id);
        if(emp.isEmpty())
            return null;
        else
            return EmpDto.FromEntitytoDTO(emp.get());
    }
    public void InsertEmp(EmpDto empDto){
        EmpEntity empEntity = EmpEntity.FromDTOtoEntity(empDto);
        this.emprepo.save(empEntity);
    }

    public void updateEmp(EmpDto empDto) {

        EmpEntity empEntity = EmpEntity.FromDTOtoEntity(empDto);

        Optional<EmpEntity> existingEmpOptional = emprepo.findById(empEntity.getId_e());

        if (existingEmpOptional.isPresent()) {
            EmpEntity existingEmp = existingEmpOptional.get();
            System.out.println(""+empEntity.getId_e());
            existingEmp.setId_e(empEntity.getId_e());
            existingEmp.setNom_e(empEntity.getNom_e());
            existingEmp.setPrenom_e(empEntity.getPrenom_e());
            existingEmp.setSF_e(empEntity.getSF_e());
            existingEmp.setTele_e(empEntity.getTele_e());
            existingEmp.setNd_e(empEntity.getNd_e());
            existingEmp.setMatricul_e(empEntity.getMatricul_e());
            existingEmp.setDateEmb_e(empEntity.getDateEmb_e());
            existingEmp.setNcnss_e(empEntity.getNcnss_e());
            existingEmp.setCin_e(empEntity.getCin_e());
            existingEmp.setFonction_e(empEntity.getFonction_e());
            existingEmp.setDateN_e(empEntity.getDateN_e());
            existingEmp.setContrat((empEntity.getContrat()));
            existingEmp.setImage((empEntity.getImage()));
            existingEmp.setBase(empEntity.getBase());
            existingEmp.setAmo(empDto.getAmo());
            existingEmp.setCimr(empEntity.getCimr());
            emprepo.save(existingEmp);

        } else {
            throw new EntityNotFoundException("Employee not found");
        }
    }


    public void DeleteEmp(Integer id){
        this.emprepo.deleteById(id);
    }

}