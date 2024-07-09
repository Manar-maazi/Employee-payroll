package BulltinPeo.service;

import BulltinPeo.dto.DtoContart;
import BulltinPeo.dto.EntrepriseDto;
import BulltinPeo.entity.EntityContrat;
import BulltinPeo.entity.Entreprise;
import BulltinPeo.repository.ContratRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContratService {
    @Autowired
    ContratRepo repo;
    public List<DtoContart> getAll() {
        List<EntityContrat> listEntity = this.repo.findAll();
        List <DtoContart> dto=new ArrayList<>();
        if(listEntity.isEmpty()){
            return null;
        }
        else{
            for( EntityContrat entity : listEntity){
                dto.add(DtoContart.from_Entity_To_Dto(entity));
            }
            return dto;
        }
    }
    public EntityContrat insert(DtoContart dto) {
        EntityContrat entityContrat=EntityContrat.from_Tdo_To_Entity(dto);
        return  this.repo.save(entityContrat);
    }
    public DtoContart getById(Integer id) {
        Optional<EntityContrat> entity = this.repo.findById(id);
        if(entity.isPresent()){
            DtoContart dto = DtoContart.from_Entity_To_Dto(entity.get());
            return dto;
        }
        else {
            return null;
        }
    }
    public boolean delete(Integer id) {
        Optional<EntityContrat> entity = this.repo.findById(id);
        if (entity.isPresent()) {
            this.repo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public boolean update(DtoContart dto) {
      Optional <EntityContrat>  present=this.repo.findById(dto.getId());

      if(present.isPresent()){
          EntityContrat entity =EntityContrat.from_Tdo_To_Entity(dto);
          entity.setId(dto.getId());
          entity.setNameContrat(dto.getNameContrat());
          this.repo.save(entity);
          return  true;
      }
      else {
          return false;
      }
    }
}
