package BulltinPeo.service;

import BulltinPeo.entity.UtilisateurEntity;
import BulltinPeo.repository.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UtilisateurDetailleService implements UserDetailsService {

    @Autowired
    private UtilisateurRepo utilisateurRepo ;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UtilisateurEntity> utilisateur = utilisateurRepo.findByEmail(email);
        if (utilisateur.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(utilisateur.get().getEmail(), utilisateur.get().getMotDePass(), new ArrayList<>());
    }
}