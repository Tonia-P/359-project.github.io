/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import database.tables.EditBloodTestTable;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import jakarta.ws.rs.Path;
import javax.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import mainClasses.BloodTest;


/**
 * REST Web Service
 *
 * @author mountant
 */
@Path("/bloodtests")
public class BloodTests {

        static HashMap<String, BloodTest> tests = new HashMap<>();
        EditBloodTestTable ebtt = new EditBloodTestTable();

    /**
     * Creates a new instance of GenericResource
     */
    public BloodTests() throws SQLException, ClassNotFoundException{
        List<BloodTest> tmpList = ebtt.selectAllBloodTests();
                
        for (BloodTest temp : tmpList) {
            tests.put(String.valueOf(temp.getBloodtest_id()), temp);
            System.out.println("Added " + temp.getBloodtest_id());
        }
    }
    
    
    /*
    @POST
    @Path("/newBloodTest")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response addBloodTest(String test) {
        Gson gson=new Gson();
        BloodTest btest = gson.fromJson(test, BloodTest.class);
        
        if (tests.containsKey(btest.name)) {
            return Response.status(Response.Status.CONFLICT).type("application/json").entity("{\"error\":\"Laptop Exists\"}").build();
        } else {
            BloodTest tmp = ebtt.addBloodTestFromJSON(test);
            tests.put(btest.name, btest);
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Laptop Added\"}").build();
        }
    }
*/
    
    @GET
    @Path("/list")
     @Produces({MediaType.APPLICATION_JSON})
    public Response getAllTests() {
    Response.Status status = Response.Status.OK;
        String json = new Gson().toJson(tests.values());
        System.out.println("AAAAAAAAAAAAAAAAAA    "  +  json);
        return Response.status(status).type("application/json").entity(json).build();
    }

    
}
