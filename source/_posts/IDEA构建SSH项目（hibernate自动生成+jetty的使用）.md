---
title: IDEA构建SSH项目（hibernate自动生成+jetty的使用）
date: 2019-03-31 19:12:06
categories:
typora-root-url: ..
typora-copy-images-to: ../images
---

# 1 创建Maven项目
![image.png](assets/undefined)

![image.png](assets/undefined)

![image.png](assets/undefined)

![image.png](assets/undefined)

- GroupId和ArtifactId被统称为“坐标”，是为了保证项目唯一性而提出的，如果你要把你项目弄到maven本地仓库去，你想要找到你的项目就必须根据这两个id去查找。 
- GroupId=域+公司名称。域又分为org、com、cn等，其中org为非营利组织，com为商业组织。
> apache公司的tomcat项目：这个项目的GroupId是org.apache，它的域是org（因为tomcat是非营利项目），公司名称是apache，ArtifactId是tomcat。 
- 我一般会将GroupId设置为cn.ftx，cn表示域为中国，ftx是我个人姓名缩写，ArtifactId设置为testProject，表示这个项目的名称是testProject。
- 依照这个设置，在创建Maven工程后，新建包的时候，包结构最好是cn.ftx.testProject打头的，如果有个StudentDao，它的全路径就是cn.ftx.testProject.dao.StudentDao

# 2 修改目录结构
## 默认生成的目录结构

![image.png](assets/undefined)

## 标准的Maven项目结构
java目录需mark didectory as source root，resources目录需mark directory as resources root

![image.png](assets/undefined)

## Java源代码结构

![image.png](assets/undefined)

## 配置文件

![image.png](assets/undefined)

![image.png](assets/undefined)


# 3 在pom.xml中添加依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.ftx</groupId>
    <artifactId>testProject</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>testProject Maven Webapp</name>
    <!-- FIXME change it to the project's website -->
    <url>http://www.example.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.7</maven.compiler.source>
        <maven.compiler.target>1.7</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>4.3.15.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>4.3.15.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.0</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>4.3.15.RELEASE</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework/spring-orm -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-orm</artifactId>
            <version>4.3.17.RELEASE</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.mchange/c3p0 -->
        <dependency>
            <groupId>com.mchange</groupId>
            <artifactId>c3p0</artifactId>
            <version>0.9.5.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-core -->
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.3.7.Final</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>6.0.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework.data/spring-data-jpa -->
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-jpa</artifactId>
            <version>1.11.13.RELEASE</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework.data/spring-data-commons -->
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-commons</artifactId>
            <version>1.13.13.RELEASE</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>4.3.18.RELEASE</version>
        </dependency>

        <!--aspectj切面依赖-->
        <dependency>
            <groupId>aspectj</groupId>
            <artifactId>aspectjrt</artifactId>
            <version>1.5.3</version>
        </dependency>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.8.13</version>
        </dependency>

        <!--用于springMVC验证的依赖-->
        <dependency>
            <groupId>org.hibernate.validator</groupId>
            <artifactId>hibernate-validator</artifactId>
            <version>6.0.7.Final</version>
        </dependency>
        <dependency>
            <groupId>javax.validation</groupId>
            <artifactId>validation-api</artifactId>
            <version>2.0.1.Final</version>
        </dependency>

        <!--处理json用到的依赖，用于对应的HttpMessageConverter-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.6</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.9.6</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.9.6</version>
        </dependency>

        <!--jetty依赖-->
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-webapp</artifactId>
            <version>9.3.2.v20150730</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-annotations</artifactId>
            <version>9.3.2.v20150730</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>apache-jsp</artifactId>
            <version>9.3.2.v20150730</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>apache-jstl</artifactId>
            <version>9.3.2.v20150730</version>
            <scope>test</scope>
        </dependency>

        <!--jstl-->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
    </dependencies>

    <build>
        <finalName>sy5-web</finalName>
        <!--防止maven构建时忽略xml文件-->
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
        <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
            <plugins>
                <plugin>
                    <artifactId>maven-clean-plugin</artifactId>
                    <version>3.0.0</version>
                </plugin>
                <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
                <plugin>
                    <artifactId>maven-resources-plugin</artifactId>
                    <version>3.0.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.7.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>2.20.1</version>
                </plugin>
                <plugin>
                    <artifactId>maven-war-plugin</artifactId>
                    <version>3.2.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-install-plugin</artifactId>
                    <version>2.5.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-deploy-plugin</artifactId>
                    <version>2.8.2</version>
                </plugin>
                <!--jetty插件-->
                <plugin>
                    <groupId>org.eclipse.jetty</groupId>
                    <artifactId>jetty-maven-plugin</artifactId>
                    <version>9.3.12.v20160915</version>
                </plugin>
            </plugins>
        </pluginManagement>

    </build>
</project>
```
# 4 新建Resource Bundel config.properties
```
################### JDBC Configuration ##########################
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost/sy5?useSSL=false&amp;serverTimezone=Asia/Shanghai 
jdbc.username=root
jdbc.password=123456789

################### Hibernate Configuration ##########################
hibernate.dialect=org.hibernate.dialect.MySQLDialect
hibernate.show_sql=false
hibernate.hbm2ddl.auto=update
hibernate.format_sql=true
hibernate.generate_statistics=true
```

# 5 在resources中添加web容器dispatcher-servlet.xml
- 最常用的URL文件应该就是jsp页面了，InternalResourceViewResolver解析器可以解析该资源
- prefix和suffix属性可以指定资源页面的前缀和后缀，可以直接把资源位置定位到项目的/WEB-INF/下面
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <mvc:annotation-driven/>
    <context:component-scan base-package="cn.ftx.testProject"/>
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

# 6 在resources中添加spring容器applicationContext.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <context:annotation-config/>
    <!-- 自动扫描所有注解该路径 -->
    <context:component-scan base-package="cn.ftx.testProject"/>
    <tx:annotation-driven transaction-manager="txManage"/>

    <!--引入配置文件-->
    <bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="locations">
            <list>
                <value>classpath:config.properties</value>
            </list>
        </property>
    </bean>

    <!--数据库连接-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driverClass}"/>
        <property name="jdbcUrl" value="${jdbc.url}}"/>
        <property name="user" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="mappingDirectoryLocations">
            <list>
                <value>classpath:cn/ftx/testProject/model</value>
            </list>
        </property>
        <property name="hibernateProperties">
            <props>
                <prop key="hibernate.dialect">${hibernate.dialect}</prop>
                <prop key="hibernate.show_sql">${hibernate.show_sql}</prop>
                <prop key="format_sql">${hibernate.format_sql}</prop>
                <prop key="hibernate.hbm2ddl.auto">${hibernate.hbm2ddl.auto}</prop>
                <prop key="generate_statistics">${hibernate.generate_statistics}</prop>
            </props>
        </property>
        <property name="packagesToScan" value="cn.ftx.testProject"></property>

        <!--映射文件地址-->
        <property name="mappingLocations">
            <list>
                <value>classpath:cn/ftx/testProject/model/Tequipment.hbm.xml</value>
            </list>
        </property>
    </bean>

    <bean id="txManage" class="org.springframework.orm.hibernate4.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>
</beans>
```

# 7 配置webapp/WEB-INF/web.xml
- 在web.xml中添加监听器，为了加载spring容器的配置文件，指定spring web容器配置文件的目录
- `/`表示从webapp开始，例如：使用`/layout/style.css`访问
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
          http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
         version="2.5">

	<!-- 项目名称 -->
	<display-name>testProject</display-name>

	<!-- 指定spring相关文件的位置 -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>classpath:applicationContext.xml</param-value>
	</context-param>

	<!-- 开启spring功能 -->
	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<!-- 配置spring mvc -->
	<servlet>
		<servlet-name>dispatcher</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:dispatcher-servlet.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<!-- 配置spring mvc mapping -->
	<servlet-mapping>
		<servlet-name>dispatcher</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>

	<!-- 配置字符集过滤器 -->
	<filter>
		<filter-name>encodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
	</filter>

	<!-- 配置项目的编码mapping -->
	<filter-mapping>
		<filter-name>encodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

	<!-- 防止内存溢出监听器 -->
	<listener>
		<listener-class>org.springframework.web.util.IntrospectorCleanupListener</listener-class>
	</listener>

	<!-- 配置静态资源不经过spring mvc -->
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.css</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.js</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.json</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.gif</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.png</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.jpg</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.ico</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.doc</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.xls</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.docx</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.xlsx</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.txt</url-pattern>
	</servlet-mapping>
	<servlet-mapping>
		<servlet-name>default</servlet-name>
		<url-pattern>*.swf</url-pattern>
	</servlet-mapping>

	<!-- 配置session超时时间，单位分钟 -->
	<session-config>
		<session-timeout>30</session-timeout>
	</session-config>

	<!-- 设置欢迎页面 -->
	<welcome-file-list>
		<welcome-file>/index.jsp</welcome-file>
		<welcome-file>/init.jsp</welcome-file>
	</welcome-file-list>

	<!-- 找不到页错误转向 -->
	<error-page>
		<error-code>404</error-code>
		<location>/error/404.jsp</location>
	</error-page>
	<!-- 系统内部错误转向 -->
	<error-page>
		<error-code>500</error-code>
		<location>/error/500.jsp</location>
	</error-page>

	<!-- druid数据源Web监控配置 -->
	<filter>
		<filter-name>druidWebStatFilter</filter-name>
		<filter-class>com.alibaba.druid.support.http.WebStatFilter</filter-class>
		<init-param>
			<param-name>exclusions</param-name>
			<param-value>/css/*,/style/*,/jslib/*,*.js,*.css,/druid*,/attached/*,*.jsp</param-value>
		</init-param>
		<init-param>
			<param-name>principalSessionName</param-name>
			<param-value>sessionInfo</param-value>
		</init-param>
		<init-param>
			<param-name>profileEnable</param-name>
			<param-value>true</param-value>
		</init-param>
	</filter>

	<!-- druid数据源Web监控配置mapping -->
	<filter-mapping>
		<filter-name>druidWebStatFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

	<!-- druid监控页面，使用${pageContext.request.contextPath}/druid/index.html访问 -->
	<servlet>
		<servlet-name>druidStatView</servlet-name>
		<servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
	</servlet>

	<!-- druid监控页面mapping -->
	<servlet-mapping>
		<servlet-name>druidStatView</servlet-name>
		<url-pattern>/druid/*</url-pattern>
	</servlet-mapping>

</web-app>
```
# 8 hibernate自动创建

![image.png](assets/undefined)

![image.png](assets/undefined)

![image.png](assets/undefined)

![image.png](assets/undefined)

![image.png](assets/undefined)

# 9 使用jetty
![image.png](assets/undefined)

![image.png](assets/undefined)

# *如何打开一个别人的项目

![image.png](assets/undefined)

![image.png](assets/undefined)

## 修改成自己的maven配置

![image.png](assets/undefined)

## 一直next，直到finish即可

![image.png](assets/undefined)

![image.png](assets/undefined)

![image.png](assets/undefined)


