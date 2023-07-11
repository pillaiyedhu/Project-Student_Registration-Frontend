import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  StudentArray : any[] = [];

  id: Number = 0;
  name: string ="";
  email: string ="";
  phone: string = "";
 
  currentStudentID = "";


  constructor(private http: HttpClient )
  {
    this.getAllStudent();
 
  }

  register()
  {
  
    let bodyData = {
      "id" : this.id,
      "name" : this.name,
      "email" : this.email,
      "phone" : this.phone
    };
 
    this.http.post("http://localhost:8089/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudent();

        this.id = 0;
        this.name = "";
        this.email = "";
        this.phone  = "";
    });
  }

  getAllStudent()
  {
    
    this.http.get("http://localhost:8089/show")
  
    .subscribe((resultData: any)=>
    {
    
        console.log(resultData);
        this.StudentArray = resultData;
    });
  }

  
  setUpdate(data: any)
  {this.id = data.id;
   this.name = data.studentname;
   this.email = data.studentaddress;
   this.phone = data.mobile;
   this.currentStudentID = data.id;
   
  }


 
  UpdateRecords()
  {
    let bodyData = {
     
      "id" : this.id,
      "name" : this.name,
      "email" : this.email,
      "phone" : this.phone
    };
    
    this.http.put("http://localhost:8089/update"+ "/" + this.currentStudentID , bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudent();
 
        this.id =0;
        this.name = "";
        this.email = "";
        this.phone  = "";
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://localhost:8089/delete"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
 
        this.id =0;
        this.name = '';
        this.email = '';
        this.phone  = '';
  
    });
 
  }

  

}



