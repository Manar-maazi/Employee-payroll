package BulltinPeo.service;


import BulltinPeo.dto.EmpDto;
import BulltinPeo.dto.EntrepriseDto;

import BulltinPeo.entity.Entreprise;
import BulltinPeo.repository.EntrepriseRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EntrepriseService {
    @Autowired

    EntrepriseRepo repo ;

    public List<EntrepriseDto> geAllEntreprise(){
        List<Entreprise> entrprisEntyiy = this.repo.findAll();
        List<EntrepriseDto> dtoList = new ArrayList<>();
        if(entrprisEntyiy.isEmpty()){
           return null;
        }
        else{
            for (Entreprise entr : entrprisEntyiy) {
                dtoList.add(EntrepriseDto.fromEntityToDTO(entr));
            }
            return dtoList;
        }
    }

    public Entreprise insert(EntrepriseDto dto){
        return this.repo.save( Entreprise.fromDTOtoEntity(dto));
    }


    public EntrepriseDto getEntrepById(Integer id) {
        Optional<Entreprise> entity = this.repo.findById(id);
        if(entity.isPresent()){
            EntrepriseDto dto = EntrepriseDto.fromEntityToDTO(entity.get());
            return dto;
        }
        else {
            return null;
        }
    }


    public boolean deleteEntre(Integer id) {
        Optional<Entreprise> entity = this.repo.findById(id);
        if (entity.isPresent()) {
            this.repo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }


    public boolean updateEntr(EntrepriseDto Dto) {
        Optional <Entreprise> ifpresent = this.repo.findById(Dto.getId_entr());
        if(ifpresent.isPresent()){
            Entreprise entity = Entreprise.fromDTOtoEntity(Dto);
            entity.setId_entr(Dto.getId_entr());
            entity.setAmo_entr(Dto.getAmo_entr());
            entity.setAdresse_entr(Dto.getAdresse_entr());
            entity.setCimr_entr(Dto.getCimr_entr());
            entity.setDesg_entr(Dto.getDesg_entr());
            entity.setEmail_entr(Dto.getEmail_entr());
            entity.setTele_ent(Dto.getTele_ent());
            entity.setLogo_entr(Dto.getLogo_entr());
            entity.setFax_ent(Dto.getFax_ent());
            entity.setCnss_entr(Dto.getCnss_entr());

            this.repo.save(entity);
            return true;
        }

        return false;
    }
}
