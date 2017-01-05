#!/usr/bin/env bash
screen -ls | grep zws 2>&1 > /dev/null
if [ $? -eq 0 ]; then
    # already running
    screen -S zws -p 0 -X hardcopy
    if [ -f "${DLG}zws/log/hardcopy.0" ]; then
        A=$(ps ax | grep "[S]CREEN -dmS zws zookin-zws" | tr -s ' '| cut -d ' ' -f 1) # screen pid
        ps ax | grep "[S]CREEN -dmS zws zookin-zws" | grep "[-]-protocol HTTPS"
        B=$? # 0 if HTTPS, 1 if HTTP
        if [ $B -eq 0 ]; then
            B="HTTPS"
        else
            B="HTTP"
        fi

        echo -e "Screen PID: $A\nProtocol: $B\n"> /tmp/zookinoutp.txt
        cat "${DLG}zws/log/hardcopy.0" | sed '/^$/d' | tail -n 30 >> /tmp/zookinoutp.txt
        dialog --backtitle "Zookin TUI" --textbox /tmp/zookinoutp.txt $(($(tput lines) - 10)) $(($(tput cols) - 10))
        rm /tmp/zookinoutp.txt
    else
        dialog --backtitle "Zookin TUI" --msgbox "ZWS is running, but a logfile could not be created." 5 100
    fi
    exit 3
else
    dialog --backtitle "Zookin TUI" --msgbox "ZWS is not running." 5 100
fi
