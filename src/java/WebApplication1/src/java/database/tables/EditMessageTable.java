/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import database.tables.EditBloodTestTable;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.BloodTest;
import mainClasses.Message;
import mainClasses.Randevouz;
import mainClasses.SimpleUser;

/**
 *
 * @author micha
 */
public class EditMessageTable {

    
     public void addMessageFromJSON(String json) throws ClassNotFoundException{
         Message msg=jsonToMessage(json);
         createNewMessage(msg);
    }
    
      public Message jsonToMessage(String json) {
        Gson gson = new Gson();
        Message msg = gson.fromJson(json, Message.class);
        return msg;
    }
     
    public String messageToJSON(Message msg) {
        Gson gson = new Gson();

        String json = gson.toJson(msg, Message.class);
        return json;
    }

   
    
    public Message databaseToMessage(int id) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM message WHERE message_id= '" + id + "'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            Message bt = gson.fromJson(json, Message.class);
            return bt;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public ArrayList<Message> databaseToAllMessages(int doctor_id, int user_id) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Message> ms = new ArrayList<Message>();
        ResultSet rs;
        
        try{
            rs = stmt.executeQuery("SELECT * FROM message WHERE doctor_id ='" + doctor_id + "' AND user_id = '" + user_id + "'");
            while(rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Message mess = gson.fromJson(json, Message.class);
                ms.add(mess);
            }
            return ms;
        }
        catch(Exception e){
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
     public ArrayList<Message> databaseToMessages(ArrayList<Randevouz> rdv) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Message> messages = new ArrayList<Message>();
        ArrayList<Message> ret = new ArrayList<Message>();
        EditSimpleUserTable esut = new EditSimpleUserTable();
        SimpleUser us;
        ResultSet rs;
        int p = 1;
        int o = 0;
        int f = 0;
        
        System.out.println("Size = " + rdv.size());
        
        try{
            for(int i = 0; i < rdv.size(); i++){
                rs = stmt.executeQuery("SELECT * FROM message WHERE doctor_id ='" + rdv.get(i).getDoctor_id() +"' AND user_id ='" + rdv.get(i).getUser_id() + "'");
                while(rs.next()){
                    String json = DB_Connection.getResultsToJSON(rs);
                    Gson gson = new Gson();
                    Message rdz = gson.fromJson(json, Message.class);
                    us = esut.databaseToSimpleUserID(rdz.getUser_id());
                    rdz.setUsername(us.getUsername());
                    messages.add(rdz);
                }
            }
            System.out.println("MESSAGE SIZE = " + messages.size());
            String pso = new Gson().toJson(messages);
            System.out.println("Randevouz LIST: " + pso);
            
            for(int i = 0; i < messages.size(); i++){
                if(!ret.isEmpty()){
                    for(int j = 0; j < ret.size(); j++){
                        if(messages.get(i).getUser_id() == ret.get(j).getUser_id()){
                            if(messages.get(i).getMessage_id() > ret.get(j).getMessage_id()){
                                
                                o = j;
                                f = 1;
                            }
                            else{
                               p = 0; 
                            }
                        }
                    }
                    if(p == 1){
                        if(f == 1){
                            ret.set(o, messages.get(i));
                        }
                        else{
                            ret.add(messages.get(i));
                        }
                    }
                }
                else{
                    ret.add(messages.get(i));
                }
                p = 1;
            }
            
            String sap = new Gson().toJson(ret);
            System.out.println("Message LIST: " + sap);
            
            return ret;
        }
        catch(Exception e){
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public void createMessageTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String sql = "CREATE TABLE message "
                + "(message_id INTEGER not NULL AUTO_INCREMENT, "
                + "doctor_id INTEGER not null,"
                + "user_id INTEGER not null,"
                + "date_time TIMESTAMP not NULL, "
                + "message VARCHAR(1000) not NULL, "
                + "sender VARCHAR(15),"
                + "blood_donation BOOLEAN,"
                + "bloodtype VARCHAR(15),"
                + "FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id), "
                + "FOREIGN KEY (user_id) REFERENCES users(user_id), "
                + "PRIMARY KEY ( message_id ))";
        stmt.execute(sql);
        stmt.close();
        con.close();

    }

    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void createNewMessage(Message msg) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " message (doctor_id,user_id,date_time,message,sender,blood_donation,bloodtype) "
                    + " VALUES ("
                    + "'" + msg.getDoctor_id() + "',"
                    + "'" + msg.getUser_id() + "',"
                    + "'" + msg.getDate_time() + "',"
                    + "'" + msg.getMessage() + "',"
                    + "'" + msg.getSender() + "',"
                    + "'" + msg.getBlood_donation() + "',"
                    + "'" + msg.getBloodtype()+ "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The bloodtest was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditBloodTestTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
