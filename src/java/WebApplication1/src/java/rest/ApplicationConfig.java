/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import jakarta.ws.rs.core.Application;

/**
 *
 * @author mountant
 */
@jakarta.ws.rs.ApplicationPath("rest")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    
    @Override 
  public Set<Object> getSingletons() {
      Set<Object> set = new HashSet<>();
        try {
            set.add(new BloodTests());
        } catch (SQLException ex) {
            Logger.getLogger(ApplicationConfig.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ApplicationConfig.class.getName()).log(Level.SEVERE, null, ex);
        }
      return set;
  }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(rest.BloodTests.class);
    }

}
