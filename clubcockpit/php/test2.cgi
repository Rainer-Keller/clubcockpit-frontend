#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#
import sys
import cgi
# enable debugging
import cgitb
cgitb.enable()

print "Content-Type: text/plain;charset=utf-8"
print

print "Hello World!"

test1=cgi.FieldStorage()
test1v=test1.getvalue("id","(no id)")
print test1
print test1v

