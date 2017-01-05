#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
screen -ls | grep zws 2>&1 > /dev/null
if [ $? -eq 0 ]; then
    # kill the process in the screen session
    screen -S zws -p 0 -X stuff $'\003' 2>&1 > /dev/null
    rm "${DLG}zws/log/hardcopy.0" 2>1 > /dev/null
    dialog --backtitle "Zookin TUI" --msgbox "ZWS is no longer running." 5 100
else
    # not running
    dialog --backtitle "Zookin TUI" --msgbox "ZWS is not running." 5 100
    exit 3
fi
