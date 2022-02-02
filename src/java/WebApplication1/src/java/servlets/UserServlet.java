/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import database.tables.EditBloodTestTable;
import database.tables.EditDoctorTable;
import database.tables.EditMessageTable;
import database.tables.EditRandevouzTable;
import database.tables.EditSimpleUserTable;
import database.tables.EditTreatmentTable;
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
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.stream.Stream;
import mainClasses.BloodTest;
import mainClasses.Doctor;
import mainClasses.SimpleUser;
import mainClasses.JSON_Converter;
import mainClasses.Message;
import mainClasses.Randevouz;
import mainClasses.Treatment;


/**
 *
 * @author oparc
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet", "/RegisterUser", "/ListUsersArr", "/LoginUser", "/LoginAdmin", "/AllUsers", "/UpdateUser", "/DeleteUser", "/RandevouzToPDF", "/AllRendevous", "/getMessages", "/AllMessages", "/RendevousToUsers", "/AddSlot", "/GetOpenSlots", "/GetUserFromId", "/AmkaToBloodtests", "/GetUserTreatments", "/InsertBloodTest", "/InsertTreatment", "/BloodDonationMessage", "/BookAppointment"})
public class UserServlet extends HttpServlet {
    
    
    EditSimpleUserTable eut = new EditSimpleUserTable();
    //SimpleUser su = eut.databaseToSimpleUser(username, password);
    
    private void bookAppointment(HttpServletRequest request, HttpServletResponse response) throws IOException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        EditRandevouzTable ert = new EditRandevouzTable();
        EditMessageTable emt = new EditMessageTable();
        Randevouz r, temp, pc;
        r = ert.jsonToRandevouz(s);
        try(PrintWriter out = response.getWriter()){
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            temp = ert.databaseToRandevouz(r.getRandevouz_id());
            ert.updateRandevouz(temp.getRandevouz_id(), temp.getUser_id(), temp.getUser_info(), "selected");
            pc = ert.databaseToRandevouzSelect("selected", temp.getUser_id(), temp.getDoctor_id());
            if(pc != null){
                Message m = new Message();
                m.setUser_id(pc.getUser_id());
                m.setDoctor_id(pc.getDoctor_id());
                m.setSender("Info Center");
                m.setDate_time(r.getDate_time());
                m.setMessage("IMPORTANT!! Your appointment is due in 4 days.");
                m.setBlood_donation(0);
                m.setBloodtype("null");
                emt.createNewMessage(m);
                
                Message l;
                l = emt.databaseToMessageDay(pc.getDoctor_id(), pc.getUser_id(), r.getDate_time());
                if(l != null){
                    response.setStatus(200);
                    jo.addProperty("success", "SUCCESS!");
                    out.write(jo.toString());
                }
                else{
                    response.setStatus(404);
                        jo.addProperty("fail", "FAIL!");
                        out.write(jo.toString());
                }
            }
            else{
                response.setStatus(404);
                        jo.addProperty("fail", "FAIL!");
                        out.write(jo.toString());
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    private void bloodDonationMessage(HttpServletRequest request, HttpServletResponse response) throws IOException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        Doctor d, temp;
        int siz = 0;
        ArrayList<SimpleUser> id = new ArrayList<SimpleUser>();
        EditDoctorTable edt = new EditDoctorTable();
        d = edt.jsonToDoctor(s);
        ArrayList<Randevouz> r = new ArrayList<Randevouz>();
        EditRandevouzTable ert = new EditRandevouzTable();
        SimpleUser su;
        EditSimpleUserTable esut = new EditSimpleUserTable();
        EditMessageTable emt = new EditMessageTable();
        try(PrintWriter out = response.getWriter()){
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            temp = edt.databaseToDoctorID(d.getDoctor_id());
            r = ert.databaseToRandevouzComplete("completed", d.getDoctor_id());
            if(r != null){
               for(int i = 0; i < r.size(); i++){
                   su = esut.databaseToSimpleUserID(r.get(i).getUser_id());
                   if(su != null){
                       if(su.getBlooddonor() == 1 && su.getBloodtype().equals(d.getBloodtype()) ){
                           if(id.size() == 0){
                               id.add(su);
                               
                               Message m = new Message();
                               m.setDoctor_id(d.getDoctor_id());
                               m.setUser_id(su.getUser_id());
                               m.setUsername(temp.getUsername());
                               m.setSender(temp.getUsername());
                               m.setMessage("You have an appointment for blood donation.");
                               m.setBlood_donation(1);
                               m.setBloodtype(d.getBloodtype());
                               emt.createNewMessageBD(m);
                           }
                           else{
                               int fl = 1;
                               int h = 0;
                               while(h < id.size()){
                                   if(id.get(h).getUser_id() == su.getUser_id()){
                                       fl = 0;
                                   }
                                   h++;
                               }
                               if(fl == 1){
                                   id.add(su);
                                   Message m = new Message();
                                   m.setDoctor_id(d.getDoctor_id());
                                   m.setUser_id(su.getUser_id());
                                   m.setUsername(temp.getUsername());
                                   m.setSender(temp.getUsername());
                                   m.setMessage("You have an appointment for blood donation.");
                                   m.setBlood_donation(1);
                                   m.setBloodtype(d.getBloodtype());
                                   emt.createNewMessageBD(m);
                               }
                           }
                       }
                       else{
                            response.setStatus(404);
                            jo.addProperty("fail", "FAIL!");
                            out.write(jo.toString());
                       }
                   }
                   else{
                       response.setStatus(404);
                        jo.addProperty("fail", "FAIL!");
                        out.write(jo.toString());
                   }
               } 
               for(int j = 0; j < r.size(); j++){
                   su = esut.databaseToSimpleUserID(r.get(j).getUser_id());
                   if(su != null){
                      siz++;
                   }
               }
               ArrayList<Message> tp = new ArrayList<Message>();
               tp = emt.databaseToMessageB(d.getDoctor_id(), 1);
               if(tp!= null){
                   if(tp.size() == siz){
                   response.setStatus(200);
                    jo.addProperty("success", "SUCCESS!");
                    out.write(jo.toString());
                   }
                   else{
                   response.setStatus(404);
                    jo.addProperty("fail", "FAIL!");
                    out.write(jo.toString());
                   }
               }
               else{
                   response.setStatus(404);
                    jo.addProperty("fail", "FAIL!");
                    out.write(jo.toString());
               }
            }
            else{
                    response.setStatus(404);
                    jo.addProperty("fail", "FAIL!");
                    out.write(jo.toString());
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void insertBloodTest(HttpServletRequest request, HttpServletResponse response) throws IOException{
        
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        System.out.println("Values: " + s);
        EditBloodTestTable ebtt = new EditBloodTestTable();
        BloodTest b, temp;
        try(PrintWriter out = response.getWriter()){
            System.out.println("-----------before add----------");
            ebtt.addBloodTestFromJSON(s);
            System.out.println("-----------after add----------");
            b = ebtt.jsonToBloodTest(s);
            temp = ebtt.databaseToBloodTest(b.getAmka(), b.getTest_date());
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            if(temp!= null){
                response.setStatus(200);
                jo.addProperty("success", "SUCCESS!");
                out.write(jo.toString());
            }
            else{
                response.setStatus(404);
                jo.addProperty("fail", "FAIL!");
                out.write(jo.toString());
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
    private void insertTreatment(HttpServletRequest request, HttpServletResponse response) throws IOException{
        
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        System.out.println("Values: " + s);
        EditTreatmentTable ett = new EditTreatmentTable();
        EditSimpleUserTable esut = new EditSimpleUserTable();
        SimpleUser u;
        EditBloodTestTable ebtt = new EditBloodTestTable();
        BloodTest b;
        Treatment t, temp;
        Gson gson = new Gson();
        JsonObject jo = new JsonObject();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try(PrintWriter out = response.getWriter()){
            t = ett.jsonToTreatment(s);
            u = esut.databaseToSimpleUserID(t.getUser_id());
            if(u != null){
                b = ebtt.databaseToBloodTestId(u.getAmka());
                if(b != null){
                    ett.addTreatmentFromJSON(s, b);
                    temp = ett.databaseToTreatmentI(t.getUser_id(), t.getDoctor_id(), t.getStart_date());
                    if(temp!= null){
                        response.setStatus(200);
                        jo.addProperty("success", "SUCCESS!");
                        out.write(jo.toString());
                    }
                    else{
                        response.setStatus(404);
                        jo.addProperty("fail", "FAIL!");
                        out.write(jo.toString());
                    }
                }
                else{
                    response.setStatus(404);
                    jo.addProperty("fail", "FAIL!");
                    out.write(jo.toString());
                }
            }
            else{
                response.setStatus(404);
                jo.addProperty("fail", "FAIL!");
                out.write(jo.toString());
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
    
    private void getUserTreatments(HttpServletRequest request, HttpServletResponse response) throws IOException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        EditTreatmentTable ett = new EditTreatmentTable();
        ArrayList<Treatment> at = new ArrayList<Treatment>();
        Treatment t;
        
        t = ett.jsonToTreatment(s);
        try(PrintWriter out = response.getWriter()){
            at = ett.databaseToTreatmentID(t.getUser_id());
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            if(at != null){
                response.setStatus(200);
                gson.toJson(at,response.getWriter());
            }
            else{
                response.setStatus(404);
                jo.addProperty("error", "Blood Tests Not Found");
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    
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
    
    private void allMessages(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException{
        System.out.println("IN ALL MESSAGES");
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        EditRandevouzTable ert = new EditRandevouzTable();
        EditMessageTable emt = new EditMessageTable();
        EditDoctorTable edt = new EditDoctorTable();
        EditSimpleUserTable esut = new EditSimpleUserTable();
        Doctor d;
        SimpleUser u;
        Randevouz temp;
        Message m;
        ArrayList<Message> mss = new ArrayList<Message>();
        
        d = edt.jsonToDoctor(s);
        
        System.out.println("DETS: " + d.getDoctor_id() + ", " + d.getUsername());
        
        try(PrintWriter out = response.getWriter()){
            
            u = esut.databaseToSimpleUserU(d.getUsername());
            if(u != null){
                System.out.println("DETS2: " + u.getUser_id());
                temp = ert.databaseToRandevouzM(d.getDoctor_id(), u.getUser_id());
                if(temp != null){
                    System.out.println("DETS3: .." + temp.getDoctor_id() + ", " + temp.getUser_id() + "..");
                    mss = emt.databaseToAllMessages(temp.getDoctor_id(), temp.getUser_id());
                    if(mss != null){
                        String json = new Gson().toJson(mss);
                        System.out.println("JSON = " + json);
                        out.println(json);
                        response.setStatus(200);
                    }
                    else{
                        response.setStatus(404);
                    }
                }
                else{
                    response.setStatus(404);
                }
            }
            
            else{
                response.setStatus(404);
            }
            
            
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    private void addSlot(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        EditRandevouzTable ert = new EditRandevouzTable();
        Randevouz r,g;
        try(PrintWriter out = response.getWriter()){
            ert.addRandevouzFromJSON(s);
            r = ert.jsonToRandevouz(s);
            g = ert.databaseToRandevouzD(r.getDate_time());
            if(g != null){
                String json = new Gson().toJson(g);
                out.println(json);
                response.setStatus(200);
            }
            else{
                response.setStatus(403);
            }   
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    

    
    private void getAllMessages(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException{
        
        /* Reminder that we need to pass doctor_id to the srvlet so we can return
           only the doctor's patient's messages, 
           and to make it so it only retuns one instance of each user.*/
        
        
        
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        ArrayList<Randevouz> rdv = new ArrayList<Randevouz>();
        ArrayList<Message> mss = new ArrayList<Message>();
        EditRandevouzTable ert = new EditRandevouzTable();
        EditMessageTable emt = new EditMessageTable();
        EditDoctorTable edt = new EditDoctorTable();
        Doctor d = edt.jsonToDoctor(s);
        try(PrintWriter out = response.getWriter()) {
            System.out.println(d.getDoctor_id());
            rdv = ert.databaseToRandevouzComplete("completed", d.getDoctor_id());
            if(rdv != null){
                mss = emt.databaseToMessages(rdv);
                if(mss != null){
                    String json = new Gson().toJson(mss);
                    out.println(json);
                    response.setStatus(200);
                
                }
                else{
                    response.setStatus(404);
                }
            }
            else{
                response.setStatus(404);
            }  
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void deleteUser(HttpServletRequest request, HttpServletResponse response){
        JSON_Converter jc = new JSON_Converter();
        EditSimpleUserTable dut = new EditSimpleUserTable();
        try {
            String user = jc.getJSONFromAjax(request.getReader());
            System.out.println("USER: " + user);
            int i;
            i = dut.deleteUserFromDatabase(user);
            System.out.println("after EDIT");
            response.setContentType("text/html;charset=UTF-8");
            if(i == 1){
                response.setStatus(200);
            }
            else{
                response.setStatus(403);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void getOpenSlots(HttpServletRequest request, HttpServletResponse response) throws IOException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        System.out.println("VALS: " + s);
        Randevouz r;
        EditRandevouzTable ert = new EditRandevouzTable();
        ArrayList<Randevouz> ret = new ArrayList<Randevouz>();
        try(PrintWriter out = response.getWriter()){
            r = ert.jsonToRandevouz(s);
            ret = ert.databaseToRandevouzFREE(r.getDoctor_id(), r.getDate_time());
            if(ret != null){
                String json = new Gson().toJson(ret);
                    out.println(json);
                    response.setStatus(200);
            }
            else{
                response.setStatus(404);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            
            
            System.out.println("Hello Login!");
            EditSimpleUserTable euta = new EditSimpleUserTable();
            EditDoctorTable edt = new EditDoctorTable(); 
            response.setContentType("text/html;charset=UTF-8");
            JSON_Converter jc = new JSON_Converter();
            
            SimpleUser u;
            SimpleUser p;
            Doctor d;
            String s = jc.getJSONFromAjax(request.getReader());
            System.out.println("Hello user!  Json from ajax    " + s);
            
            
            u = euta.jsonToSimpleUser(s);
            p = euta.databaseToSimpleUser(u.getUsername(), u.getPassword());
            d = edt.jsonToDoctor(s);
            if(p != null){
                System.out.println("before User JSON");
                String json = euta.databaseUserToJSON(u.getUsername(), u.getPassword());
                if(json==null){
                    System.out.println("Hello 404!");
                    json = "{\"error\":\"The username or password is incorrect.\"}";
                    response.setStatus(403);
                    out.println(json);
                    return;
                }
                else{
                    response.setStatus(200);
                    out.println(json);
                    return;
                }
            }
            
            if(d != null){
                System.out.println("before Doctor JSON");
                String json2 = edt.databaseToJSON(d.getUsername(), d.getPassword());
                if(json2==null){
                    System.out.println("Hello 404!");
                    json2 = "{\"error\":\"The username or password is incorrect.\"}";
                    response.setStatus(403);
                    out.println(json2);
                }
                else{
                    response.setStatus(200);
                    out.println(json2); 
                }
            }   
                
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
         
        } catch (SQLException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    private void randevouzToPDF(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException, ClassNotFoundException{
        System.out.println("IN FUNC");
        JSON_Converter jc = new JSON_Converter();
        System.out.println("MAKING JSON");
        //System.out.println("JSON = "+jc.getJSONFromAjax(request.getReader()) );
        String s = jc.getJSONFromAjax(request.getReader());
        System.out.println("TO STRING");
        System.out.println("STRING = " + s);
        EditDoctorTable edt = new EditDoctorTable();
        EditRandevouzTable ert = new EditRandevouzTable();
        EditSimpleUserTable eute = new EditSimpleUserTable();
        Doctor d;
        Randevouz r;
        SimpleUser u;
        ArrayList<Randevouz> rdv = new ArrayList<Randevouz>();
        
        System.out.println("MAKING DOC");
        r = ert.jsonToRandevouz(s);
        System.out.println("GETTING RANDEVOUZ");
        rdv = ert.databaseToRandevouzT(r.getDoctor_id(), r.getDate_time());   
        System.out.println("CREATING DOCUMENT");
        Document document = new Document();
        try{
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("C:\\Users\\admin\\Desktop\\client\\359-project.github.io\\src\\java\\WebApplication1\\Daily_Randevouz.pdf"));
            document.open();
            
            Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
            Chunk chunk = new Chunk("Today's Randevous", font);
            Phrase pr = new Phrase();
            pr.add(chunk);
            Paragraph para = new Paragraph();
            para.add(pr);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(new Paragraph("\n"));
            
            
            PdfPTable table = new PdfPTable(6);
            Stream.of("Patient Name", "Date & Time", "Price", "Doctor Info", "User Info", "Status")
                .forEach(columnTitle -> {
                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(columnTitle));
                table.addCell(header);
            });
            
            for(int i = 0; i < rdv.size(); i++){
                u = eute.databaseToSimpleUserID(rdv.get(i).getUser_id());
                table.addCell(u.getFirstname() + " " + u.getLastname());
                table.addCell(rdv.get(i).getDate_time());
                table.addCell(rdv.get(i).getPrice() + "€");
                table.addCell(rdv.get(i).getDoctor_info());
                table.addCell(rdv.get(i).getUser_info());
                table.addCell(rdv.get(i).getStatus());
            }
            
            table.setHorizontalAlignment(Element.ALIGN_CENTER);
            
            document.add(table);
            
            document.close();
            writer.close();
            
            File file = new File("C:\\Users\\admin\\Desktop\\client\\359-project.github.io\\src\\java\\WebApplication1\\Daily_Randevouz.pdf");
            FileInputStream in = null;
            OutputStream os = null;
            
            if(file.exists()){
                System.out.println(response.getBufferSize());
                response.setContentType("application/pdf");
                response.addHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
                os = response.getOutputStream();
                in = new FileInputStream(file);
                byte[] buf = new byte[response.getBufferSize()];
                int byt = -1;
                while((byt = in.read(buf)) != -1){
                    os.write(buf, 0, byt);
                }
                response.setStatus(200);
                if(in != null){
                    in.close();
                }
                os.flush();
                if(os != null){
                    os.close();
                }
            }
            else{
                response.setStatus(405);
            }
        } catch (DocumentException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }catch(FileNotFoundException e){
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, e);
        }
    }
    
    
    
    private void allRendevous(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException, ClassNotFoundException{
        System.out.println("IN FUNC allRendevous");
        JSON_Converter jc = new JSON_Converter();
        System.out.println("MAKING JSON");
        //System.out.println("JSON = "+jc.getJSONFromAjax(request.getReader()) );
        String s = jc.getJSONFromAjax(request.getReader());
        System.out.println("TO STRING");
        System.out.println("STRING = " + s);
        EditRandevouzTable ert = new EditRandevouzTable();
      
        Randevouz r = ert.jsonToRandevouz(s);
        ArrayList<Randevouz> rdv = new ArrayList<Randevouz>();  
        try(PrintWriter out = response.getWriter()){
            System.out.println("GETTING RANDEVOUZ");
            rdv = ert.databaseToRandevouzT(r.getDoctor_id(), r.getDate_time()); 
            
            if(rdv != null){
                String json = new Gson().toJson(rdv);
                System.out.println("JSON = " + json);
                out.println(json);
                response.setStatus(200);
                
            }
            else{
                response.setStatus(405);
            }
        }catch(FileNotFoundException e){
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, e);
        }
    }
    
    private void allRendevousUsers(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException, ClassNotFoundException{
        System.out.println("IN FUNC allRendevous");
        JSON_Converter jc = new JSON_Converter();
        System.out.println("MAKING JSON");
        //System.out.println("JSON = "+jc.getJSONFromAjax(request.getReader()) );
        String s = jc.getJSONFromAjax(request.getReader());
        System.out.println("TO STRING");
        System.out.println("STRING = " + s);
        EditRandevouzTable ert = new EditRandevouzTable();
        EditSimpleUserTable esut = new EditSimpleUserTable();
        ArrayList<SimpleUser> sp = new ArrayList<SimpleUser>();
        Randevouz r = ert.jsonToRandevouz(s);
        ArrayList<Randevouz> rdv = new ArrayList<Randevouz>();  
        try(PrintWriter out = response.getWriter()){
            System.out.println("GETTING RANDEVOUZ");
            rdv = ert.databaseToRandevouzComplete("completed", r.getDoctor_id());
            
            if(rdv != null){
                sp = esut.databaseToUsernames(rdv);
                if(sp != null){
                    String json = new Gson().toJson(sp);
                    System.out.println("JSON = " + json);
                    out.println(json);
                    response.setStatus(200);
                }
                else{
                    response.setStatus(404);
                }   
            }
            else{
                response.setStatus(405);
            }
        }catch(FileNotFoundException e){
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, e);
        }
    }
    
    private void getUserFromID(HttpServletRequest request, HttpServletResponse response) throws IOException{
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        SimpleUser u, us;
        EditSimpleUserTable esut = new EditSimpleUserTable();
        u = esut.jsonToSimpleUser(s);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();
        JsonObject jo = new JsonObject();
        try(PrintWriter out = response.getWriter()){
            us = esut.databaseToSimpleUserID(u.getUser_id());
            if(us != null){
                jo.addProperty("user_id", us.getUser_id());
                jo.addProperty("user_name", us.getUsername());
                jo.addProperty("password", us.getPassword());
                jo.addProperty("email", us.getEmail());
                jo.addProperty("firstname", us.getFirstname());
                jo.addProperty("lastname", us.getLastname());
                jo.addProperty("birthdate", us.getBirthdate());
                jo.addProperty("address", us.getAddress());
                jo.addProperty("amka", us.getAmka());
                jo.addProperty("city", us.getCity());
                jo.addProperty("country", us.getCountry());
                jo.addProperty("gender", us.getGender());
                jo.addProperty("telephone", us.getTelephone());
                jo.addProperty("blooddonnor", us.getBlooddonor());
                jo.addProperty("bloodtype", us.getBloodtype());
                jo.addProperty("height", us.getHeight());
                jo.addProperty("weight", us.getWeight());
                jo.addProperty("lat", us.getLat());
                jo.addProperty("lon", us.getLon());
                response.setStatus(200);
                out.write(jo.toString());
            }
            else{
                response.setStatus(404);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    private void listUsersArr (HttpServletRequest request, HttpServletResponse response) 
            throws IOException, ServletException, SQLException{
        
        EditSimpleUserTable edyt = new EditSimpleUserTable();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try(PrintWriter out = response.getWriter()){
            ArrayList<SimpleUser> docs;
            docs = edyt.databaseToUsers();
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
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
     private void loginAdmin (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, SQLException {
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            
            response.setContentType("text/html;charset=UTF-8");
            JSON_Converter jc = new JSON_Converter();
            SimpleUser u,p;
            String s = jc.getJSONFromAjax(request.getReader());
            u = eut.jsonToSimpleUser(s);
            
            p = eut.databaseToSimpleUserU("admin");
            String json = eut.databaseUserToJSON(u.getUsername(), u.getPassword());
            
            
            if(!u.getUsername().equals(p.getUsername()) || !u.getPassword().equals(p.getPassword())){
                System.out.println("Hello 404!");
                json = "{\"error\":\"The username or password is incorrect.\"}";
                response.setStatus(403);
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
    
    
    private void amkaToBloodtests(HttpServletRequest request, HttpServletResponse response) throws IOException{
    
        JSON_Converter jc = new JSON_Converter();
        String s = jc.getJSONFromAjax(request.getReader());
        BloodTest bt;
        ArrayList<BloodTest> b = new ArrayList<BloodTest>();
        EditBloodTestTable ebtt = new EditBloodTestTable();
        bt = ebtt.jsonToBloodTest(s);
        try(PrintWriter out = response.getWriter()){
            b = ebtt.databaseToBloodTest(bt.getAmka());
            Gson gson = new Gson();
            JsonObject jo = new JsonObject();
            if(b != null){
                response.setStatus(200);
                gson.toJson(b,response.getWriter());
            }
            else{
                response.setStatus(404);
                jo.addProperty("error", "Blood Tests Not Found");
                
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
    
    
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
        case "/ListUsersArr":
            {
                try {
                    listUsersArr(request, response);
                } catch (SQLException ex) {
                    Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
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
        case "/LoginAdmin":
            {
                try {
                    loginAdmin(request, response);
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
         System.out.println(action);
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
             
        case "/getMessages":
            getAllMessages(request, response);
            break;        
                
        case "/AllMessages":
            allMessages(request, response);
            break;  
            
        case "/RendevousToUsers":
            try {
                allRendevousUsers(request, response);
            } catch (SQLException | ClassNotFoundException ex) {
                Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
            break;
            
        case "/AddSlot":
            addSlot(request, response);
            break;
            
        case "/AllRendevous":
            {
                try {
                    allRendevous(request, response);
                } catch (SQLException | ClassNotFoundException ex) {
                    Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
		break;
                
        case "/RandevouzToPDF":
            {
                try {
                    System.out.println("IN FUNC CALL");
                    randevouzToPDF(request, response);
                } catch (SQLException | ClassNotFoundException ex) {
                    Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        break;        
                
        case "/LoginAdmin":
                   {
                       try {
                           loginAdmin(request, response);
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
        
         case "/DeleteUser":
                    {
                        deleteUser(request, response);
                    }
                break;      
      
         case "/GetUserFromId":
             getUserFromID(request, response);
             break;
             
         case "/GetOpenSlots":
            getOpenSlots(request, response);
            break;
            
         case "/AmkaToBloodtests":
            amkaToBloodtests(request, response);
            break;
            
         case "/GetUserTreatments":
             getUserTreatments(request, response);
             break;
             
         case "/InsertBloodTest":
             insertBloodTest(request, response);
             break;
             
         case "/InsertTreatment":
             insertTreatment(request, response);
             break;
             
         case "/BloodDonationMessage":
             bloodDonationMessage(request, response);
             break;
             
         case "/BookAppointment":
             bookAppointment(request, response);
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
