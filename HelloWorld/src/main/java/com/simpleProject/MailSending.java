package com.simpleProject;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

import org.springframework.mail.javamail.JavaMailSenderImpl;


public class MailSending {
	

	public static void sendMail(String address, String subject, String message) throws MessagingException {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setDefaultEncoding("UTF-8");

        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.port", 587);
        sender.setJavaMailProperties(properties);

        Session mailSession = Session.getDefaultInstance(properties, null);
        //mailSession.setDebug(true);
        MimeMessage mailMessage = new MimeMessage(mailSession);

        final InternetAddress recipient = new InternetAddress(address);

        mailMessage.addRecipient(Message.RecipientType.TO, recipient);
        mailMessage.setSubject(subject);
        mailMessage.setContent(message, "text/html");

        Transport transport = mailSession.getTransport("smtp");
        transport.connect( "smtp.gmail.com", "feddelegrand17@gmail.com", "sdasdasdsadwew1");
        transport.sendMessage(mailMessage, mailMessage.getAllRecipients());
        transport.close();
   }
	
}
