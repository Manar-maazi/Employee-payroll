package BulltinPeo.controller;

import BulltinPeo.dto.EntrepriseDto;
import BulltinPeo.dto.UtilisateurDto;
import BulltinPeo.entity.Entreprise;
import BulltinPeo.entity.UtilisateurEntity;
//import BulltinPeo.service.UtilisateurService;
import BulltinPeo.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Utilisateur")
public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/auth/register")
    public ResponseEntity<UtilisateurDto> regeister(@RequestBody UtilisateurDto reg){
        return ResponseEntity.ok(utilisateurService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UtilisateurDto> login(@RequestBody UtilisateurDto req){
        UtilisateurDto response = utilisateurService.login(req);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<UtilisateurDto> refreshToken(@RequestBody UtilisateurDto req){
        return ResponseEntity.ok(utilisateurService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<UtilisateurDto> getAllUsers(){
        System.out.println("ok");
        return ResponseEntity.ok(utilisateurService.getAllUsers());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<UtilisateurDto> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(utilisateurService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<UtilisateurDto> updateUser(@PathVariable Integer userId, @RequestBody UtilisateurDto reqres){
        return ResponseEntity.ok(utilisateurService.updateUser(userId, reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<UtilisateurDto> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UtilisateurDto response = utilisateurService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<UtilisateurDto> deleteUSer(@PathVariable Integer userId){
        return ResponseEntity.ok(utilisateurService.deleteUser(userId));
    }

}
