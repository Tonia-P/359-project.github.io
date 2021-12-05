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
public class Randevouz {
    int randevouz_id,doctor_id,user_id,price;
    String date_time, doctor_info,user_info,status;

    public int getRandevouz_id() {
        return randevouz_id;
    }

    public void setRandevouz_id(int randevouz_id) {
        this.randevouz_id = randevouz_id;
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

    
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDate_time() {
        return date_time;
    }

    public void setDate_time(String date_time) {
        this.date_time = date_time;
    }

    public String getDoctor_info() {
        return doctor_info;
    }

    public void setDoctor_info(String doctor_info) {
        this.doctor_info = doctor_info;
    }

    public String getUser_info() {
        return user_info;
    }

    public void setUser_info(String user_info) {
        this.user_info = user_info;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    
    
}
