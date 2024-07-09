package BulltinPeo.controller;


import BulltinPeo.dto.EntrepriseDto;
import BulltinPeo.entity.Entreprise;
import BulltinPeo.service.EntrepriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Entreprise")
@CrossOrigin(origins = "http://localhost:3000")

public class EntreprisController {

    @Autowired
    EntrepriseService service ;

    @GetMapping("getAll")
    public List<EntrepriseDto> FinAll(){
        return  this.service.geAllEntreprise();
    }

    @PostMapping("insert")
    public Entreprise addEntr(@RequestBody EntrepriseDto entr){
        return this.service.insert(entr);
    }

   @GetMapping("get_ID")
    public EntrepriseDto get(@RequestParam Integer id){
        return service.getEntrepById(id);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete_emp(@RequestParam Integer id) {
        boolean deletionStatus = this.service.deleteEntre(id);
        if (deletionStatus) {
            return ResponseEntity.ok("Entity with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("update")
    public ResponseEntity<String> update(@RequestBody  EntrepriseDto Dto){
        boolean updateStatus = this.service.updateEntr(Dto);
        if(updateStatus){
            return ResponseEntity.ok("Entity with ID " + Dto.getId_entr() + " updated successfully");
        }else{
            return ResponseEntity.notFound().build();
        }
    }


}
