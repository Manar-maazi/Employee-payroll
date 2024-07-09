package BulltinPeo.service;

import BulltinPeo.dto.EntrepriseDto;
import BulltinPeo.dto.UtilisateurDto;
import BulltinPeo.entity.Entreprise;
import BulltinPeo.entity.UtilisateurEntity;
import BulltinPeo.repository.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {


    @Autowired
    private UtilisateurRepo utilisateurRepo;
    @Autowired
    private JWT jwtutil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public UtilisateurDto register(UtilisateurDto registrationRequest) {
        UtilisateurDto resp = new UtilisateurDto();

        try {
            UtilisateurEntity utilisateur = new UtilisateurEntity();
            utilisateur.setNom(registrationRequest.getNom());
            utilisateur.setPrenom(registrationRequest.getPrenom());
            utilisateur.setEmail(registrationRequest.getEmail());
            utilisateur.setMotDePass(passwordEncoder.encode(registrationRequest.getMot_de_pass()));
            utilisateur.setRole(registrationRequest.getRole());
            UtilisateurEntity utlisateursResult = utilisateurRepo.save(utilisateur);
            if (utlisateursResult.getId() > 0) {
                resp.setUtilisateurs(utlisateursResult);
                resp.setMessage("utilisateur sauvgarder avec succés");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public UtilisateurDto login(UtilisateurDto loginRequest) {
        UtilisateurDto response = new UtilisateurDto();
        System.out.println("response => " + response);
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getMot_de_pass()));
            var user = utilisateurRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtutil.generateToken(user);
            var refreshToken = jwtutil.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            }
        return response;
    }






    public UtilisateurDto refreshToken(UtilisateurDto refreshTokenReqiest){
        UtilisateurDto response = new UtilisateurDto();
        try{
            String ourEmail = jwtutil.extractUsername(refreshTokenReqiest.getToken());
            UtilisateurEntity users = utilisateurRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtutil.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtutil.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }


    public UtilisateurDto getAllUsers() {
        UtilisateurDto reqRes = new UtilisateurDto();

        try {
            List<UtilisateurEntity> result = utilisateurRepo.findAll();
            if (!result.isEmpty()) {
                reqRes.setUtilisateursList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }


    public UtilisateurDto getUsersById(Integer id) {
        UtilisateurDto reqRes = new UtilisateurDto();
        try {
            UtilisateurEntity usersById = utilisateurRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setUtilisateurs(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }


    public UtilisateurDto deleteUser(Integer userId) {
        UtilisateurDto reqRes = new UtilisateurDto();
        try {
            Optional<UtilisateurEntity> userOptional = utilisateurRepo.findById(userId);
            if (userOptional.isPresent()) {
                utilisateurRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public UtilisateurDto updateUser(Integer userId, UtilisateurDto updatedUser) {
        UtilisateurDto reqRes = new UtilisateurDto();
        try {
            Optional<UtilisateurEntity> userOptional = utilisateurRepo.findById(userId);
            if (userOptional.isPresent()) {
                UtilisateurEntity existingUser = userOptional.get();
                existingUser.setNom(updatedUser.getNom());
                existingUser.setPrenom(updatedUser.getPrenom());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setRole(updatedUser.getRole());


                // Check if password is present in the request
                if (updatedUser.getMot_de_pass() != null && !updatedUser.getMot_de_pass().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setMotDePass(passwordEncoder.encode(updatedUser.getMot_de_pass()));
                }

                UtilisateurEntity savedUser = utilisateurRepo.save(existingUser);
                reqRes.setUtilisateurs(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }


    public UtilisateurDto getMyInfo(String email){
        UtilisateurDto reqRes = new UtilisateurDto();
        try {
            Optional<UtilisateurEntity> userOptional = utilisateurRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setUtilisateurs(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }



}

