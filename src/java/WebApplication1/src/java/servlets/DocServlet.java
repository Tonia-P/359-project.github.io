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
import java.util.logging.Level;
import java.util.logging.Logger;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.core.Response;
import static jakarta.ws.rs.core.Response.status;
import java.util.ArrayList;
import mainClasses.Doctor;
import mainClasses.JSON_Converter;
 
/**
 *
 * @author oparc
 */
@WebServlet(name = "DocServlet", urlPatterns = {"/DocServlet", "/AllDoctors", "/AllDoctorsArr", "/LoginDoctor", "/RegisterDoctor", "/NotCertified", "/Certify"})
public class DocServlet extends HttpServlet {
    
    
    
    
    private void listDoctors (HttpServletRequest request, HttpServletResponse response) 
            throws IOException, ServletException {
        
        System.out.println("Hello List docs!");
        
        response.setContentType("text/html;charset=UTF-8");
        //String username=request.getParameter("username");
        //String password=request.getParameter("password");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */

            EditDoctorTable edt = new EditDoctorTable();
            //SimpleUser su = eut.databaseToSimpleUser(username, password);
            String json = edt.selectAllDoctors();
            out.println(json); 
            response.setStatus(200);
        
        } catch (SQLException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void notCertified(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException, SQLException{
            EditDoctorTable edyt = new EditDoctorTable();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            try(PrintWriter out = response.getWriter()){
            ArrayList<Doctor> docs;
            docs = edyt.databaseToDoctorsC(0);
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            if(docs != null){
                response.setStatus(200);
                gson.toJson(docs,response.getWriter());
            }
            else{
                jo.addProperty("error", "The list doesn't exist.");
                response.setStatus(404);
                response.getWriter().write(jo.toString());
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DocServlet.class.getName()).log(Level.SEVERE, null, ex);
        }            
    }
    
    private void certify(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException, SQLException{
            JSON_Converter jc = new JSON_Converter();
            EditDoctorTable edyt = new EditDoctorTable();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            try(PrintWriter out = response.getWriter()){
            String user = jc.getJSONFromAjax(request.getReader());
            System.out.println("USER: " + user);
            int k = edyt.updateDoctorC(user, 1);
            System.out.println(k);
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            if(k == 1){
                System.out.println("IN SUCCESS");
                jo.addProperty("success", "SUCCESS");
                 response.setStatus(200);
                 response.getWriter().write(jo.toString());
            }
            else{
                jo.addProperty("error", "The list doesn't exist.");
                response.setStatus(404);
                response.getWriter().write(jo.toString());
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DocServlet.class.getName()).log(Level.SEVERE, null, ex);
        }            
    }
    
    
    private void listDoctorsArr (HttpServletRequest request, HttpServletResponse response) 
            throws IOException, ServletException, SQLException{
        
        EditDoctorTable edyt = new EditDoctorTable();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try(PrintWriter out = response.getWriter()){
            ArrayList<Doctor> docs;
            docs = edyt.databaseToDoctors();
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            if(docs != null){
                response.setStatus(200);
                gson.toJson(docs,response.getWriter());
            }
            else{
                jo.addProperty("error", "The list doesn't exist.");
                response.setStatus(404);
                response.getWriter().write(jo.toString());
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DocServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet DocServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet DocServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
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
        String action = request.getServletPath();
	switch (action) {
	case "/AllDoctors":
		listDoctors(request, response);
		break;
                
        case "/AllDoctorsArr":
            {
                try {
                    listDoctorsArr(request, response);
                } catch (SQLException ex) {
                    Logger.getLogger(DocServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
		break;
        case "/NotCertified":
            {
                try {
                    notCertified(request,response);
                } catch (SQLException ex) {
                    Logger.getLogger(DocServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

	default:
		listDoctors(request, response);
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getServletPath();
        System.out.println(action);
	switch (action) {
	case "/AllDoctors":
		listDoctors(request, response);
		break;
                
        case "/Certify":
            {
                try {
                    certify(request, response);
                    
                } catch (SQLException ex) {
                    Logger.getLogger(DocServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
                break;

	
	default:
		listDoctors(request, response);
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
