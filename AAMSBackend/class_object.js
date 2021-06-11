var db = require('./sqltest.js');
var mysql=require('mysql');
var MD5 = require("crypto-js/md5");
class attendance
{
    constructor()
        {
        }
    async table_create()
        {
        
        try
        {
            const result= await  db.execute("CREATE TABLE `mydb2`.`students` (`enrolment_no` INT NOT NULL,`Name` VARCHAR(45) NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_courses` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result1= await db.execute("CREATE TABLE `mydb2`.`subject1` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_periods_attended` INT NOT NULL,`total_periods` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result2= await db.execute("CREATE TABLE `mydb2`.`subject2` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_periods_attended` INT NOT NULL,`total_periods` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result3= await db.execute("CREATE TABLE `mydb2`.`subject3` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_periods_attended` INT NOT NULL,`total_periods` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result4= await db.execute("CREATE TABLE `mydb2`.`subject4` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_periods_attended` INT NOT NULL,`total_periods` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result5= await db.execute("CREATE TABLE `mydb2`.`subject5` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_periods_attended` INT NOT NULL,`total_periods` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result6= await db.execute("CREATE TABLE `mydb2`.`subject6` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`no_of_periods_attended` INT NOT NULL,`total_periods` INT NOT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);");
            const result7=await db.execute("CREATE TABLE `mydb2`.`users` (`username` varchar(255) NOT NULL,`pswd` varchar(255) DEFAULT NULL,PRIMARY KEY (`username`),UNIQUE KEY `username` (`username`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
            const result8=await db.execute("CREATE TABLE `mydb2`.`teachers` (`username` varchar(255) NOT NULL,`pswd` varchar(255) DEFAULT NULL,`class_id` VARCHAR(45) NOT NULL,`subject` VARCHAR(45) NOT NULL,PRIMARY KEY (`username`),UNIQUE KEY `username` (`username`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
            const result9=await db.execute("CREATE TABLE `mydb2`.`admin` (`username` varchar(255) NOT NULL,`pswd` varchar(255) DEFAULT NULL,PRIMARY KEY (`username`),UNIQUE KEY `username` (`username`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
            const result10=await db.execute("CREATE TABLE `mydb2`.`time_table` (`class_id` VARCHAR(45) NOT NULL,`period_1` INT NOT NULL,`period_2` INT NOT NULL,`period_3` INT NOT NULL,`period_4` INT NOT NULL,`period_5` INT NOT NULL,PRIMARY KEY (`class_id`),UNIQUE INDEX `class_id_UNIQUE` (`class_id` ASC) VISIBLE);");
            const result11 =await db.execute("CREATE TABLE `mydb2`.`percentage_table` (`enrolment_no` INT NOT NULL,`class_id` VARCHAR(45) NOT NULL,`subject1` INT NULL,`subject2` INT NULL,`subject3` INT NULL,`subject4` INT NULL,`subject5` INT NULL,`subject6` INT NULL,PRIMARY KEY (`enrolment_no`),UNIQUE INDEX `enrolment_no_UNIQUE` (`enrolment_no` ASC) VISIBLE);")
        }
        catch(err)
        {
            console.log(err);
        }
        } 
    async  delete_tables()
        {
            await new Promise(r => setTimeout(r, 1000));
            
        try
        {
            const result= await db.execute("drop table students;");
            const result1= await db.execute("drop table subject1;");
            const result2= await db.execute("drop table subject2;");
            const result3= await db.execute("drop table subject3;");
            const result4= await db.execute("drop table subject4;");
            const result5= await db.execute("drop table subject5;");
            const result6= await db.execute("drop table subject6;");
            const result7=await db.execute("drop table users");
            const result8=await db.execute("drop table teachers")
            const result9=await db.execute("drop table admin")
            const result10=await db.execute("drop table time_table")
            const result11=await db.execute("drop table percentage_table")
            console.log("final table dropped")
        }
        catch(err)
        {
            console.log(err);
        }
        }   
    async insert_into_students_static()
        {
            await new Promise(r => setTimeout(r, 1000));
            
        try
        {
            const result1=await db.execute("insert into students values('185001174','Sujay','B','6')");
            const result2=await db.execute("insert into students values('185001175','Shrinath','B','6')");
            const result3=await db.execute("insert into students values('185001176','Utkarsh','A','6')");
            const result4=await db.execute("insert into students values('185001177','rajini','A','6')");
            const result5=await db.execute("insert into students values('185001178','kamal','C','6')");

            const result6=await db.execute("insert into users values('185001174',MD5('pass1'))");
            const result7=await db.execute("insert into users values('185001175',MD5('pass2'))");
            const result8=await db.execute("insert into users values('185001176',MD5('pass3'))");
            const result9=await db.execute("insert into users values('185001177',MD5('pass5'))");
            const result10=await db.execute("insert into users values('185001178',MD5('pass6'))");
            
        }
        catch(err)
        {
            console.log(err);
        }
        await this.insert_into_subjects_static()
        await this.insert_into_teachers_static()
        await this.insert_into_admin_static()
        await this.insert_into_time_table_static()
        await this.insert_into_percentage_table_static()
        }
    async insert_into_subjects_static()
        {
            await new Promise(r => setTimeout(r, 5000));
        try
        {
        const result=await db.execute("select * from students")
        for(var i=0;i<result[0].length;i++ )
        {
            var a=[]
            a.push(result[0][i]["enrolment_no"])
            a.push(result[0][i]["class_id"])
            a.push(0)//no of hours attended for this subject
            a.push(0)//total no of hours for this subject
            const result1=await db.execute("insert into subject1 values(?,?,?,?)",(a));
            const result2=await db.execute("insert into subject2 values(?,?,?,?)",(a));
            const result3=await db.execute("insert into subject3 values(?,?,?,?)",(a));
            const result4=await db.execute("insert into subject4 values(?,?,?,?)",(a));
            const result5=await db.execute("insert into subject5 values(?,?,?,?)",(a));
            const result6=await db.execute("insert into subject6 values(?,?,?,?)",(a));
        }   
           
        }
        catch(err)
        {
            console.log(err);
        }
        }
    async  insert_into_teachers_static()
        {
        try 
        {
        
            
            const result8=await db.execute("insert into teachers values('teacher1',MD5('pass1'),'A','subject1')");
            const result9=await db.execute("insert into teachers values('teacher2',MD5('pass2'),'B','subject2')");
            const result10=await db.execute("insert into teachers values('teacher3',MD5('pass3'),'C','subject1')");
            const result11=await db.execute("insert into teachers values('teacher4',MD5('pass4'),'B','subject2')");
            const result12=await db.execute("insert into teachers values('teacher5',MD5('pass5'),'C','subject1')");
        }
        catch(err)
        {
            console.log(err)
        }
        }
    async  insert_into_admin_static()
        {
        try 
        {
            
            const result8=await db.execute("insert into admin values('admin1',MD5('pass1'))");
            const result9=await db.execute("insert into admin values('admin2',MD5('pass2'))");
            const result10=await db.execute("insert into admin values('admin3',MD5('pass3'))");
            const result11=await db.execute("insert into admin values('admin4',MD5('pass4'))");
            const result12=await db.execute("insert into admin values('admin5',MD5('pass5'))");
        }
        catch(err)
        {
            console.log(err)
        }
        
        
        } 
    async insert_into_time_table_static()
        {
        try 
        {
            const result1=await db.execute("insert into time_table values('A','1','1','3','4','5')");
            const result2=await db.execute("insert into time_table values('B','2','3','2','5','6')");
            const result3=await db.execute("insert into time_table values('C','3','4','3','6','1')");
        }
        catch(err)
        {
            console.log(err)
        }


        }      
    async  insert_into_percentage_table_static()
        {
        try 
        {   
            const result=await db.execute("select * from students")
            for(var i=0;i<result[0].length;i++ )
            {   
                var a=[]
                a.push(result[0][i]["enrolment_no"])
                a.push(result[0][i]["class_id"])
                a.push("0")
                a.push("0")
                a.push("0")
                a.push("0")
                a.push("0")
                a.push("0")
                var result1=await db.execute("insert into percentage_table values(?,?,?,?,?,?,?,?)",(a));
            }
           
        
        }
        catch(err)
        {
            console.log(err)
        }
        
        
        }  
    async insert_into_students_dynamic(std,password)
        {
            await new Promise(r => setTimeout(r, 5000));
        try
        {

            const result1=await db.execute("insert into students values(?,?,?,?)",(std));
            const enrollment_no=std[0]
            var a=[]
            a.push(enrollment_no)
            a.push(password)
            const result2=await db.execute("insert into users values(?,MD5(?))",(a));
        }
        catch(err)
        {
            console.log(err);
        }
        await this.insert_into_subjects_dynamic(std[0],std[2])
        await this.insert_into_percentage_table_dynamic(std[0],std[2])

        }   
    async insert_into_subjects_dynamic(roll_no,class_id)
        {
        try
        {
            var a=[]
            a.push(roll_no)
            a.push(class_id)
            a.push(0)//no of hours attended for this class
            a.push(0)//total no of hours for this class
            const result1=await db.execute("insert into subject1 values(?,?,?,?)",(a));
            const result2=await db.execute("insert into subject2 values(?,?,?,?)",(a));
            const result3=await db.execute("insert into subject3 values(?,?,?,?)",(a));
            const result4=await db.execute("insert into subject4 values(?,?,?,?)",(a));
            const result5=await db.execute("insert into subject5 values(?,?,?,?)",(a));
            const result6=await db.execute("insert into subject6 values(?,?,?,?)",(a)); 
        }
        catch(err)
        {
            console.log(err);
        }
        
        }    
    async insert_into_percentage_table_dynamic(roll_no,class_id)
        {
        try 
        {
        var a=[]
        a.push(roll_no)
        a.push(class_id)
        a.push("0")
        a.push("0")
        a.push("0")
        a.push("0")
        a.push("0")
        a.push("0")
        const result12=await db.execute("insert into percentage_table values(?,?,?,?,?,?,?,?)",(a));
        }
        catch(err)
        {
            console.log(err)
        }
        
        
        } 
         
    async view_table(myArgs)
        {
            await new Promise(r => setTimeout(r, 5000));
        try
        {
            
        
            var sql = "SELECT * FROM ??";
            sql = mysql.format(sql, myArgs);
            var result=await db.execute(sql);
            console.log(result[0]);
          
        }
        catch(err)
        {
            console.log(err);
        }
        }  
    async change_time_table(new_time_table,class_id)
        {
        try 
        {   
            new_time_table.push(class_id)
            var sql="update time_table set period_1=?,period_2=?,period_3=?,period_4=?,period_5=? where class_id=?"
            sql = mysql.format(sql,new_time_table);
            var result=await db.execute(sql)
        
        }
        catch(err)
        {
            console.log(err)
        }
        
        
        }   
    async update_timetable()
        {
            await new Promise(r => setTimeout(r, 5000));
        try
        {   
            var result=await db.execute("select * from time_table")
            var len=result[0].length
            for (var j=0;j<len;j++)
            {
                var dict=result[0][j]
                var class_id=dict["class_id"]
                var timetable=[]
                timetable.push(dict["period_1"])
                timetable.push(dict["period_2"])
                timetable.push(dict["period_3"])
                timetable.push(dict["period_4"])
                timetable.push(dict["period_5"])
                for(var i=0;i<timetable.length;i++)
                   {
                       var a=[]
                       a.push("subject"+timetable[i])
                       a.push(class_id)
                       var sql = "update ?? set  total_periods=total_periods+1 where class_id=?";
                       sql = mysql.format(sql,a);
                       var result1=await db.execute(sql)
                    }
                
            } 

        } 
        catch(err)
        {
            console.log(err);
        }
        }
    async  update_attendance(roll_no)
        {
        //first period is zeroth period
        var current = new Date();
        //var period_no=current.getHours()-9// use this when actual subject time is going on, for now use dummy variable
        var period_no=0
        try
        {
            var result=await db.execute("select class_id from students where enrolment_no=?",([roll_no]));
            var class_id=result[0][0]["class_id"]
            var result1=await db.execute("select * from time_table where class_id=?",([class_id]))
            var dict=result1[0][0]
            var time_table=[]
            time_table.push(dict["period_1"])
            time_table.push(dict["period_2"])
            time_table.push(dict["period_3"])
            time_table.push(dict["period_4"])
            time_table.push(dict["period_5"])
            console.log(time_table)
            var a=[]
            a.push("subject"+time_table[period_no])
            a.push(roll_no)
            console.log(a)
            var sql = "update ?? set no_of_periods_attended=no_of_periods_attended+1 where enrolment_no=?";
            sql = mysql.format(sql,a);
            var result=await db.execute(sql)
            console.log(result[0])
        
            
        } 
        catch(err)
        {
            console.log(err);
        }
        }
    async update_attendance_static()
        {
        try 
        {   for(var i=1;i<=6;i++)
            {
            var table_name="subject"+i
            var sql="update ?? set no_of_periods_attended=1 where total_periods>0"
            sql = mysql.format(sql,table_name);
            var result=await db.execute(sql)
            sql="update ?? set no_of_periods_attended=2 where total_periods>1"
            sql = mysql.format(sql,table_name);
            result=await db.execute(sql)
            sql="update ?? set no_of_periods_attended=3 where total_periods>2"
            sql = mysql.format(sql,table_name);
            result=await db.execute(sql)
            }
        }
        catch(err)
        {
            console.log(err)
        }
        
        
        } 
    async percentage_Function()
        { 
            await new Promise(r => setTimeout(r, 5000));
        try
        {
            var re=await db.execute("select * from students")
            for(var j=0;j<re[0].length;j++)
            {
                var roll_no=re[0][j]["enrolment_no"]
                var a=[]
                for(var i=1;i<=6;i++)
                {
                    var subject_name="subject"+i
                    var sql="select no_of_periods_attended from ?? where enrolment_no=?" 
                    var inserts = [];
                    inserts.push(subject_name)
                    inserts.push(roll_no)
                    sql = mysql.format(sql, inserts);
                    var result=await db.execute(sql)
                    var no_of_periods_attended=result[0][0]["no_of_periods_attended"]
                    sql="select total_periods from ?? where enrolment_no=?"
                    sql = mysql.format(sql, inserts);
                    result=await db.execute(sql)
                    var total_periods=result[0][0]["total_periods"]
                    var percentage=(no_of_periods_attended/total_periods)*100
                    if(isNaN(percentage))
                    {
                        percentage=0
                    }
                    a.push(percentage)
                }   
                a.push(roll_no)
                var sql1="update percentage_table set subject1=?,subject2=?,subject3=?,subject4=?,subject5=?,subject6=? where enrolment_no=?"
                sql1 = mysql.format(sql1,a);
                const result1=await db.execute(sql1)
            }
        }
        catch(err)
        {
            console.log(err);
        }
        }  
    async password_checker(table_name,username,password)
        {
        await new Promise(r => setTimeout(r, 0));
        try
        { 
            var result;  
            var sql="select pswd from ?? where username=?"
            sql = mysql.format(sql,[table_name,username]);
            const result2=await db.execute(sql)
            var db_password=result2[0][0]["pswd"]
            var user_pass= MD5(password).toString();
            if(db_password==user_pass)
            {
                result = 1;
                console.log("same")
            }
            else
            {
                result = 0
                
                console.log("different")
            }
        }
        catch(err)
        {   
            console.log(err);
        }
        return(result)
        
        }  
    async teacher_dashboard(username)
        {
        try 
        {
            var sql="select * from teachers where username=?"
            sql=mysql.format(sql,[username])
            const result= await db.execute(sql)
            var class_id=result[0][0]["class_id"]
            var subject=result[0][0]["subject"]
            var a=[]
            a.push(subject)
            a.push(class_id)
            sql="select enrolment_no,?? from percentage_table where class_id=?"
            sql=mysql.format(sql,a)
            console.log(sql)
            const result1=await db.execute(sql)   
            console.log(result1[0])
            let enrollment_list = []
            let percent_list = []
            for(let i=0;i<result1[0].length;i++){
                enrollment_list.push(result1[0][i]["enrolment_no"])
                percent_list.push(result1[0][i][subject])
            }
            return[class_id, subject, enrollment_list, percent_list]
        }
        catch(err)
        {
            console.log(err)
        }

        
        } 
    async student_dashboard(enrolment_no)
        {
        let full_list = []
        let full_result = []
        try 
        {
            var sql="select * from percentage_table where enrolment_no=?"
            sql=mysql.format(sql,[enrolment_no])
            const result= await db.execute(sql)
            console.log(result[0])
            var mean_list=[]
            var standard_deviation_list=[]
            var subject_names=["subject1","subject2","subject3","subject4","subject5","subject6"]
            for(var j=0;j<=5;j++)
            {
                sql="select ?? from percentage_table"
                sql=mysql.format(sql,[subject_names[j]])
                var result1=await db.execute(sql)
                full_result.push(result1[0][j][subject_names[j]])
                var mean=0
                for(var i=0;i<result1[0].length;i++)
                {
                    mean=mean+result1[0][i][subject_names[j]]
                }
                mean=mean/i
                var diff=0
                for(i=0;i<result1[0].length;i++)
                {
                    diff=diff+Math.pow(mean-result1[0][i][subject_names[j]],2)
                }
                diff=diff/i
                var standard_deviation=Math.pow(diff,0.5)
                mean_list.push(mean)
                standard_deviation_list.push(standard_deviation)
            }
            console.log(mean_list)
            console.log(standard_deviation_list)
            full_list.push(full_result)
            full_list.push(mean_list)
            full_list.push(standard_deviation_list)
        }
        catch(err)
        {
            console.log(err)
        }

        return[full_result, mean_list, standard_deviation_list]
    } 

    async close_db()
    {
        await db.end();
    } 
        

}
async function function_Calls()
{
    let c1=new attendance()
    // await c1.table_create();
    // await c1.insert_into_students_static();
    // await c1.insert_into_students_dynamic(["185001321","new_lad1","C","6"],"testpass1")
    // await c1.insert_into_students_dynamic(["185001322","new_lad2","A","6"],"testpass2")
    // await c1.change_time_table(['1','1','1','1','1'],"B")//first parameter is the new time table, second parameter is class_id
    // await c1.update_timetable();
    // await c1.update_timetable();
    // await c1.update_attendance_static();
    // await c1.update_attendance("185001178");
    // await c1.view_table("subject1")   
    // await c1.percentage_Function()
    // await c1.teacher_dashboard("teacher2")
    // await c1.delete_tables()
    var x  = await c1.password_checker("teachers","teacher1","pass1")
    console.log(x);

    await c1.close_db()
    
}

// function_Calls()

module.exports=attendance
