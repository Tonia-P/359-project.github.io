/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.tables.EditDoctorTable;
import database.tables.EditSimpleUserTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mainClasses.Doctor;
import mainClasses.SimpleUser;
import mainClasses.JSON_Converter;

/**
 *
 * @author oparc
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet", "/RegisterUser", "/LoginUser", "/AllUsers", "/UpdateUser"})
public class UserServlet extends HttpServlet {
    
    
    EditSimpleUserTable eut = new EditSimpleUserTable();
    //SimpleUser su = eut.databaseToSimpleUser(username, password);
    
    
    private void listUsers (HttpServletRequest request, HttpServletResponse response) 
            throws IOException, ServletException {
        
        System.out.println("Hello List users!");
        
        response.setContentType("text/html;charset=UTF-8");
        //String username=request.getParameter("username");
        //String password=request.getParameter("password");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */

            EditSimpleUserTable eut = new EditSimpleUserTable();
            //SimpleUser su = eut.databaseToSimpleUser(username, password);
            String json = eut.selectAllSimpleUsers();
            out.println(json); 
            response.setStatus(200);
        
        } catch (SQLException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    
    private void addUser (HttpServletRequest request, HttpServletResponse response) 
            throws IOException, ServletException {
        
        System.out.println("Hello Register user!");
        
      
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            JSON_Converter jc = new JSON_Converter();
            SimpleUser u;
            EditSimpleUserTable editable = new EditSimpleUserTable();
            String s = jc.getJSONFromAjax(request.getReader());
            System.out.println("Hello user!  Json from ajax    " + s);

            u = editable.jsonToSimpleUser(s);
            
            
            
            
            
            if( editable.CheckDuplicates(u) == 1){
                System.out.println("Hello 406!");
                String json = "{\"error\":\"Username, AMKA or e-mail already exists.\"}";
                response.setStatus(406);
                out.println(json);
            }
            else{
                editable.addSimpleUserFromJSON(s);
                System.out.println("Hello 200!");
                String json = editable.selectAllSimpleUsers();
                out.println(json); 
                response.setStatus(200);
            }
        
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex); 

        }
    }
    
    
    private void loginUser (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, SQLException {
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            
            
            System.out.println("Hello Login user!");
            
            response.setContentType("text/html;charset=UTF-8");
            JSON_Converter jc = new JSON_Converter();
            SimpleUser u;
            String s = jc.getJSONFromAjax(request.getReader());
            System.out.println("Hello user!  Json from ajax    " + s);
            
            
            u = eut.jsonToSimpleUser(s);
            
            String json = eut.databaseUserToJSON(u.getUsername(), u.getPassword());
            if(json==null){
                System.out.println("Hello 404!");
                json = "{\"error\":\"The username or password is incorrect.\"}";
                response.setStatus(404);
                out.println(json);
             
             }
            else{
                response.setStatus(200);
                out.println(json); 
            }
                
                
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
         
        } catch (SQLException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void UpdateUser(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, SQLException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        EditSimpleUserTable eut = new EditSimpleUserTable();
        EditDoctorTable dr = new EditDoctorTable();
        SimpleUser us = eut.jsonToSimpleUser(s);
        try {
            SimpleUser p = eut.databaseToSimpleUserU(us.getUsername());
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            if(p != null){
                if(!p.getEmail().equals(us.getEmail())&& us.getEmail() != null){
                    Doctor d = dr.databaseToDoctorU(us.getEmail());
                    if(d == null ){
                        eut.updateSimpleUserEmail(p.getUsername(), us.getEmail());
                    }
                    else{
                        System.out.println("doctor: " + d.getEmail());
                        response.setStatus(403);
                        jo.addProperty("error", "Another user exists with the same email.");
                        response.getWriter().write(jo.toString());
                        return;
                    }
                }
                else if(!p.getPassword().equals(us.getPassword()) && us.getPassword() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getPassword(), "password");
                }
                else if(!p.getFirstname().equals(us.getFirstname()) && us.getFirstname() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getFirstname(), "firstname");
                }
                else if(!p.getLastname().equals(us.getLastname()) && us.getLastname()!= null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getLastname(), "lastname");
                }
                else if(!p.getBirthdate().equals(us.getBirthdate()) && us.getBirthdate() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getBirthdate(), "birthdate");
                }
                else if(!p.getGender().equals(us.getGender()) && us.getGender() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getGender(), "gender");
                }
                else if(!p.getCountry().equals(us.getCountry()) && us.getCountry() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getCountry(), "country");
                }
                else if(!p.getCity().equals(us.getCity()) && us.getCity() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getCity(), "city");
                }
                else if(!p.getAddress().equals(us.getAddress()) && us.getAddress() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getAddress(), "address");
                }
                else if(!p.getTelephone().equals(us.getTelephone()) && us.getTelephone() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getTelephone(), "telephone");
                }
                else if(p.getHeight() != us.getHeight() && us.getHeight() != 0){
                    eut.updateSimpleUserH(p.getUsername(), us.getHeight(), "height");
                }
                else if(p.getWeight()!= us.getWeight() && us.getWeight() != 0){
                    eut.updateSimpleUser(p.getUsername(), us.getWeight());
                }
                else if(p.getBlooddonor()!= us.getBlooddonor() && us.getBlooddonor() != 0){
                    eut.updateSimpleUserH(p.getUsername(), us.getBlooddonor(), "blooddonor");
                }
                else if(!p.getBloodtype().equals(us.getBloodtype()) && us.getBloodtype() != null){
                    eut.updateSimpleUserAny(p.getUsername(), us.getBloodtype(), "bloodtype");
                }
                response.setStatus(200);
                jo.addProperty("success", "User details update completed!");
            }
            else{
                response.setStatus(404);
                jo.addProperty("error", "User does not exist.");
            }
            response.getWriter().write(jo.toString());
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            //out.println("<!DOCTYPE html>");
            //out.println("<html>");
            //out.println("<head>");
            //out.println("<title>Servlet UserServlet</title>");            
           // out.println("</head>");
            //out.println("<body>");
            //out.println("<h1>Servlet UserServlet at " + request.getContextPath() + "</h1>");
            //out.println("</body>");
            //out.println("</html>");
            listUsers(request, response);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        String action = request.getServletPath();
	switch (action) {
	case "/AllUsers":
		listUsers(request, response);
		break;
	case "/LoginUser":
            {
                try {
                    loginUser(request, response);
                } catch (SQLException ex) {
                    Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
		break;

	default:
		listUsers(request, response);
		break;
	}
        
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       	String action = request.getServletPath();
         System.out.println("in doPost");
	switch (action) {
	case "/RegisterUser":
		addUser(request, response);
		break;
	case "/LoginUser":
                   {
                       try {
                           loginUser(request, response);
                       } catch (SQLException ex) {
                           Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
                       }
                   }
		break;
                
        case "/UpdateUser":
                    {
                        System.out.println("in /UpdateUser");
                        try{
                            UpdateUser(request, response);
                        }catch(SQLException ex){
                             Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                break;

	default:
		addUser(request, response);
		break;
	}
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
