---
title: Java学习小记
date: 2019-04-01 22:07:13
categories:
typora-root-url: ..
typora-copy-lalal-to: ../lalal
---

# Scanner
```java
Scanner s = new Scanner(System.in);
//  使用hasNextXxx()方法进行验证，再使用nextXxx()来读取

//  next()
//  next() 不能得到带有空格的字符串
import java.util.Scanner; 
 
public class ScannerDemo {  
    public static void main(String[] args) {  
        Scanner scan = new Scanner(System.in); 
        // 从键盘接收数据  
        //next方式接收字符串
        System.out.println("next方式接收：");
        // 判断是否还有输入
        if(scan.hasNext()){   
          String str1 = scan.next();
          System.out.println("输入的数据为："+str1);  
        }  
 
    }  
}

//	nextLine()
//  以Enter为结束符，可以获得空白
import java.util.Scanner; 
 
public class ScannerDemo {  
    public static void main(String[] args) {  
        Scanner scan = new Scanner(System.in); 
        // 从键盘接收数据  
        //nextLine方式接收字符串
        System.out.println("nextLine方式接收：");
        // 判断是否还有输入
        if(scan.hasNextLine()){   
          String str2 = scan.nextLine();
          System.out.println("输入的数据为："+str2);  
        }  
 
    }  
}

scanner.close();
```

# 数组大小用size()
```java
students.size();
```
# 数组访问用get()
```java
temp = students.get(i);
```
# 数组修改用set()
```java
students.set(i, stu);
```
# for的遍历
```java
//	打印所有学生的信息
public void displayAllStudent() {
    if (students.size() > 0) {
        for (Student stu : students) {
            System.out.println("学号: " + stu.getSno() + "\t姓名: "
                    + stu.getSname() + "\t系部: " + stu.getSdept());
        }
    }else {
        System.out.println("数据库中无学生记录!");
    }
}
```
# 读取文件
```java
// 读取文件获得原始数据
private void getData() {
    try {
        FileReader in_ = new FileReader("StudentDAO.txt");
        BufferedReader in = new BufferedReader(in_);
        String line;
        String reg1 = "\\s+";
        String str[] = new String[3];
        while ((line = in.readLine()) != null) {
            Student temp = new Student();
            str = line.split(reg1);
            temp.setSno(str[0]);
            temp.setSname(str[1]);
            temp.setSdept(str[2]);
            students.add(temp);
        }
        in.close();
    } catch (IOException e) {
        System.out.println(e);
    }
}
```

# 写入文件
```java
//更新数据库,把数据输入文件
private void updateData() {
    try {
        FileWriter out_ = new FileWriter("StudentDAO.txt");
        BufferedWriter out = new BufferedWriter(out_);
        Student temp = new Student();
        for (int i = 0; i < students.size(); i++) {
            temp = students.get(i);
            out.write(temp.getSno() + " " + temp.getSname() + " "
                    + temp.getSdept() + "\r\n");
        }
        out.close();
    } catch (IOException e) {
        System.out.println(e);
    }
}
```

# BufferedReader
```java
do {
    //	从输入流读取一个字符并把该字符作为整数值返回， 当流结束的时候返回 -1
    c = (char)br.read();
    System.out.println(c);
} while (c != 'q');

do {
    str = br.readLine();
    System.out.println(str);
} while(!str.equals("end"));
```

# FileInputStream（从文件读取数据）
```java
InputStream f = new FileInputStream("C:/java/hello");

File f = new File("C:/java/hello");
InputStream out = new FileInputStream(f);
```

# FileOutputStream（向文件中写数据）
```java
OutputStream f = new FileOutputStream("C:/java/hello")

File f = new File("C:/java/hello");
OutputStream f = new FileOutputStream(f);
```

# 读取写入流最后都要close();

# 读写一定要用byte
```java
byte bWrite[] = { 11, 21, 3, 40, 5 };
byte bWrite[] = "zhouzhiwenishandsome".getBytes();
```
