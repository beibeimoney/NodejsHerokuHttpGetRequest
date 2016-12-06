#!/usr/bin/python
# -*- coding: utf-8 -*-
import urllib2
message = "naber%20cinim"
subject = "no"
urllib2.urlopen("https://rfidopenpcsendmail.herokuapp.com/sendmail?page_access_token=testss&message="+message+"&subject="+subject).read()
