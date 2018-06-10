#!/bin/sh 
 if [ "$DANTE_User" = "" ]
 then
	sockd -f $CFGFILE_NONE -p $PIDFILE
 else  
	useradd  -s /sbin/nologin $DANTE_User 
	echo $DANTE_User:$DANTE_Pass > /tmp/proxy.pass 
	chpasswd < /tmp/proxy.pass
	sockd -f $CFGFILE_USER -p $PIDFILE
 fi