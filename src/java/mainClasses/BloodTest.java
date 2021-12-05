/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package mainClasses;

/**
 *
 * @author Mountantonakis
 */
public class BloodTest {
    int bloodtest_id;
    String amka;
    String test_date;
    String medical_center;
    double vitamin_d3;
    String vitamin_d3_level;
     double vitamin_b12;
    String vitamin_b12_level;
     double cholesterol;
    String cholesterol_level;
         double blood_sugar;
    String blood_sugar_level;
         double iron;
    String iron_level;
   

    public int getBloodtest_id() {
        return bloodtest_id;
    }

    public void setBloodtest_id(int bloodtest_id) {
        this.bloodtest_id = bloodtest_id;
    }

    public double getVitamin_d3() {
        return vitamin_d3;
    }

    public void setVitamin_d3(double vitamin_d3) {
        this.vitamin_d3 = vitamin_d3;
    }

    public double getVitamin_b12() {
        return vitamin_b12;
    }

    public void setVitamin_b12(double vitamin_b12) {
        this.vitamin_b12 = vitamin_b12;
    }

    public void setValues(){
      this.setCholesterol_level();
      this.setBlood_sugar_level();
      this.setIron_level();
      this.setVitamin_b12_level();
      this.setVitamin_d3_level();
    } 
   
    public double getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(double cholesterol) {
        this.cholesterol = cholesterol;
    }

    public double getBlood_sugar() {
        return blood_sugar;
    }

    public void setBlood_sugar(double blood_sugar) {
        this.blood_sugar = blood_sugar;
    }

    public double getIron() {
        return iron;
    }

    public void setIron(double iron) {
        this.iron = iron;
    }

    public String getVitamin_d3_level() {
        return vitamin_d3_level;
    }

    public void setVitamin_d3_level() {
         if(vitamin_d3>150){
            vitamin_d3_level="High";
        }
        else if(vitamin_d3>=30){
           vitamin_d3_level="Normal";
        }
        else if(vitamin_d3>0){
            vitamin_d3_level="Low";
        }
    }

    public String getVitamin_b12_level() {
        return vitamin_b12_level;
    }

    public void setVitamin_b12_level() {
          if(vitamin_b12>925){
            vitamin_b12_level="High";
        }
        else if(vitamin_b12>=160){
           vitamin_b12_level="Normal";
        }
        else if(vitamin_b12>0){
            vitamin_b12_level="Low";
        }
    }

    public String getCholesterol_level() {
        return cholesterol_level;
    }

    public void setCholesterol_level() {
        if(cholesterol>=200){
            cholesterol_level="High";
        }
        else if(cholesterol<200 && cholesterol>0){
             cholesterol_level="Normal";
        }
    }

    public String getBlood_sugar_level() {
        return blood_sugar_level;
    }

    public void setBlood_sugar_level() {
        if(blood_sugar>110){
            blood_sugar_level="High";
        }
        else if(blood_sugar>=70){
            blood_sugar_level="Normal";
        }
        else if(blood_sugar>0){
            blood_sugar_level="Low";
        }
        
    }

    public String getIron_level() {
        return iron_level;
    }

    public void setIron_level() {
        if(iron>150){
            iron_level="High";
        }
        else if(iron>=60){
           iron_level="Normal";
        }
        else if(iron>0){
            iron_level="Low";
        }
    }

    public String getAmka() {
        return amka;
    }

    public void setAmka(String amka) {
        this.amka = amka;
    }

    public String getTest_date() {
        return test_date;
    }

    public void setTest_date(String test_date) {
        this.test_date = test_date;
    }

    public String getMedical_center() {
        return medical_center;
    }

    public void setMedical_center(String medical_center) {
        this.medical_center = medical_center;
    }
   
    
}
