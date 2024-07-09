package BulltinPeo.controller;

import BulltinPeo.dto.DtoContart;
import BulltinPeo.entity.EntityContrat;
import BulltinPeo.service.ContratService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("Contrat")
@CrossOrigin(origins = "http://localhost:3000")

public class ContratController {

    @Autowired
    ContratService service ;

    @GetMapping("getAll")
    public List<DtoContart> FinAll(){
        return  this.service.getAll();
    }

    @PostMapping("insert")
    public EntityContrat insert(@RequestBody DtoContart dtoContart){
        return this.service.insert(dtoContart);
    }

    @GetMapping("get_ID")
    public DtoContart get(@RequestParam Integer id){
        return service.getById(id);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete_emp(@RequestParam Integer id) {
        boolean deletionStatus = this.service.delete(id);
        if (deletionStatus) {
            return ResponseEntity.ok("Entity with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("update")
    public ResponseEntity<String> update(@RequestBody  DtoContart Dto){
        boolean updateStatus = this.service.update(Dto);
        if(updateStatus){
            return ResponseEntity.ok("Entity with ID " + Dto.getId() + " updated successfully");
        }else{
            return ResponseEntity.notFound().build();
        }
    }

}



