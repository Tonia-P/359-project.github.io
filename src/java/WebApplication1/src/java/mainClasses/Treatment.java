/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package mainClasses;

/**
 *
 * @author Mike
 */
public class Treatment {
    int treatment_id,doctor_id,user_id;
    String start_date,end_date;
    String treatment_text;
    int bloodtest_id;

    public int getTreatment_id() {
        return treatment_id;
    }

    public void setTreatment_id(int treatment_id) {
        this.treatment_id = treatment_id;
    }

    public String getTreatment_text() {
        return treatment_text;
    }

    public void setTreatment_text(String treatment_text) {
        this.treatment_text = treatment_text;
    }


    public int getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(int doctor_id) {
        this.doctor_id = doctor_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public int getBloodtest_id() {
        return bloodtest_id;
    }

    public void setBloodtest_id(int bloodtest_id) {
        this.bloodtest_id = bloodtest_id;
    }

  
    
}
