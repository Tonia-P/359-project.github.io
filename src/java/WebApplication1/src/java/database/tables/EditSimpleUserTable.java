/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import mainClasses.SimpleUser;
import com.google.gson.Gson;
import mainClasses.User;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Randevouz;
import java.util.List;
import java.util.ArrayList;
import servlets.GetUser;

/**
 *
 * @author Mike
 */
public class EditSimpleUserTable {

 
    public void addSimpleUserFromJSON(String json) throws ClassNotFoundException{
         SimpleUser user=jsonToSimpleUser(json);
         addNewSimpleUser(user);
    }
    
     public SimpleUser jsonToSimpleUser(String json){
         Gson gson = new Gson();

        SimpleUser user = gson.fromJson(json, SimpleUser.class);
        return user;
    }
    
    public String simpleUserToJSON(SimpleUser user){
         Gson gson = new Gson();

        String json = gson.toJson(user, SimpleUser.class);
        return json;
    }
    
   
    
    public void updateSimpleUser(String username,double weight) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE users SET weight='"+weight+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }
    
    public void updateSimpleUserEmail(String username,String email) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE users SET email='"+email+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }
    
    public void updateSimpleUserH(String username, int s, String field) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE users SET "+field+"='"+s+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }
    
    public void updateSimpleUserAny(String username, String s, String field) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE users SET "+field+"='"+s+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }
    
     public ArrayList<SimpleUser> databaseToUsers() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<SimpleUser> users=new ArrayList<SimpleUser>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                SimpleUser u = gson.fromJson(json, SimpleUser.class);
                users.add(u);
            }
            return users;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public void printSimpleUserDetails(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username + "' AND password='"+password+"'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }
    
    
    public int CheckDuplicates (SimpleUser su) throws SQLException, ClassNotFoundException{
        List<SimpleUser> users = new ArrayList<>();
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String dup = null;

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + su.getUsername() + "' OR AMKA = '" + su.getAmka() + "' OR email = '" + su.getEmail() 
                    + "' UNION SELECT * FROM doctors WHERE username = '" + su.getUsername() + "' OR AMKA = '" + su.getAmka() + "' OR email = '" + su.getEmail());
            if (!rs.isBeforeFirst())  return 0;
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            
            
            System.out.println("Hello DUPLICATES!     " + json);
            return 1;
        } catch (SQLException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return 1;
    }
    
    public String selectAllSimpleUsers() throws SQLException, ClassNotFoundException {
        
        List<SimpleUser> users = new ArrayList<>();
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users");
            while (rs.next()) {
                String json=DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                SimpleUser user = gson.fromJson(json, SimpleUser.class);
                
                users.add(user);
                
                
            }
            String json = new Gson().toJson(users );
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    } 
    
    public SimpleUser databaseToSimpleUser(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            SimpleUser user = gson.fromJson(json, SimpleUser.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public SimpleUser databaseToSimpleUserU(String username) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username +"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            SimpleUser user = gson.fromJson(json, SimpleUser.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public String databaseUserToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    
    public int deleteUserFromDatabase(String username) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username +"'");
        if(rs != null){
            System.out.println("DELETE FROM users WHERE username = " + username);
            stmt.executeUpdate("DELETE FROM users WHERE username =" + username);}
        else if(rs == null){
            rs = stmt.executeQuery("SELECT * FROM doctors WHERE username = '" + username +"'");
            if(rs != null){
                System.out.println("IT'S IN THE doctors");
                stmt.executeUpdate("DELETE FROM doctors WHERE username =" + username);
            }
            else{
                System.out.println("FAILED");
                return 0;
            }
        }
        System.out.println("SUCC");
        return 1;
    }
   
    public void verifyLogin (SimpleUser user) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        
        try {
            

            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + user.getUsername() + "' AND password='"+user.getPassword()+"'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }

     public void createSimpleUserTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE users "
                + "(user_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(40) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(20) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    amka VARCHAR (11) not null,"
                + "    country VARCHAR(30) not null,"
                + "    city VARCHAR(50) not null,"
                + "    address VARCHAR(50) not null,"
                + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + "    telephone VARCHAR(14) not null,"
                + "    height INTEGER,"
                + "    weight DOUBLE,"
                + "   blooddonor BOOLEAN,"
                + "   bloodtype VARCHAR(7) not null,"
                + " PRIMARY KEY ( user_id))";
        stmt.execute(query);
        stmt.close();
    }
    
    
    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewSimpleUser(SimpleUser user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " users (username,email,password,firstname,lastname,birthdate,gender,amka,country,city,address,"
                    + "lat,lon,telephone,height,weight,blooddonor,bloodtype)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getAmka() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getCity() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getHeight() + "',"
                    + "'" + user.getWeight() + "',"
                    + "'" + user.isBloodDonor() + "',"
                    + "'" + user.getBloodtype() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The user was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditSimpleUserTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

   

}
