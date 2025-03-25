function copy(textarea) {
    let textArea = document.getElementById(textarea);

    textArea.focus()
    textArea.select()

    document.execCommand('copy')
}


function lastFridayOfMonth(year, month) { "use strict";
	var lastDay = new Date(year, month+1, 0);
	if(lastDay.getDay() < 5) {
		lastDay.setDate(lastDay.getDate() - 7);
	}
	lastDay.setDate(lastDay.getDate() - (lastDay.getDay() -5));
	return lastDay.getDate();
}

function calculate_stats() {
    let elems = document.getElementsByTagName("input");
    for (var i = 0; i<elems.length; i++) {
        elems[i].style.borderColor = "rgb(166, 166, 166)";
    }
    document.getElementById("YTD").style.borderColor = "rgb(166, 166, 166)";
    // DATE
    const mth = ["", 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let today = new Date();
    let DAY = String(today.getDate()).padStart(2, '0');
    let MON = Number(String(today.getMonth() + 1).padStart(2, '0'));
    let MONTH = mth[MON];
    let YEAR = today.getFullYear();


    // YESTERDAY ACCUMULATIVE
    let ystd = document.getElementById("YTD").value;
    let my_array = ystd.split("\n");
    if (my_array.length != 10) {
        document.getElementById("YTD").style.borderColor = "red";
        alert(`There needs to be 10 lines in the textarea, but there are ${my_array.length}! Check FAQ for more info.`);
        return;
    }

    let error = false;
    for (let i = 0; i < 10; i ++) {
        if (i != 6 && i != 8 && i != 9 && my_array[i].split(",").length != 2) {
            document.getElementById("YTD").style.borderColor = "red";
            error = true;
            alert(`There needs to be 2 items in line ${i + 1}! Check  FAQ for more info.`);
        }
        if (i == 6 && my_array[i].split(",").length != 7) {
            document.getElementById("YTD").style.borderColor= "red";
            error = true;
            alert(`There needs to be 7 items in line 7, but there are ${my_array[i].split(",").length}! Check FAQ for more info.`);
        }
        if (i == 8 && my_array[i].split(",").length != 8) {
            document.getElementById("YTD").style.borderColor= "red";
            error = true;
            alert(`There needs to be 8 items in line 9, but there are ${my_array[i].split(",").length}! Check FAQ for more info.`);
        }
        if (i == 9 && my_array[i].split(",").length != 1) {
            document.getElementById("YTD").style.borderColor= "red";
            error = true;
            alert(`There needs to be 1 item in line 9, but there are ${my_array[i].split(",").length}! Check FAQ for more info.`);
        }
    }

    let YESTERDAY_LOCAL_ACCUMULATIVE_T_SORTIES = 0;
    let YESTERDAY_LOCAL_ACCUMULATIVE_T_HOURS   = 0;
    let YESTERDAY_LOCAL_ACCUMULATIVE_P_SORTIES = 0;
    let YESTERDAY_LOCAL_ACCUMULATIVE_P_HOURS   = 0;
    let YESTERDAY_LOCAL_ACCUMULATIVE_A_SORTIES = 0;
    let YESTERDAY_LOCAL_ACCUMULATIVE_A_HOURS   = 0;

    let YESTERDAY_OVERSEAS_ACCUMULATIVE_T_SORTIES = 0;
    let YESTERDAY_OVERSEAS_ACCUMULATIVE_T_HOURS   = 0;
    let YESTERDAY_OVERSEAS_ACCUMULATIVE_P_SORTIES = 0;
    let YESTERDAY_OVERSEAS_ACCUMULATIVE_P_HOURS   = 0;
    let YESTERDAY_OVERSEAS_ACCUMULATIVE_A_SORTIES = 0;
    let YESTERDAY_OVERSEAS_ACCUMULATIVE_A_HOURS   = 0;

    let YESTERDAY_ACCUMULATIVE_CXM1  = 0;
    let YESTERDAY_ACCUMULATIVE_CXM2  = 0;
    let YESTERDAY_ACCUMULATIVE_CXM3  = 0;
    let YESTERDAY_ACCUMULATIVE_CXM4  = 0;
    let YESTERDAY_ACCUMULATIVE_CXOPS = 0;
    let YESTERDAY_ACCUMULATIVE_CXOTH = 0;
    let YESTERDAY_ACCUMULATIVE_CXWX =  0;       

    if (MON == my_array[9]) {
        YESTERDAY_LOCAL_ACCUMULATIVE_T_SORTIES = Number(my_array[0].split(",")[0]);
        YESTERDAY_LOCAL_ACCUMULATIVE_T_HOURS   = parseFloat(my_array[0].split(",")[1]);
        YESTERDAY_LOCAL_ACCUMULATIVE_P_SORTIES = Number(my_array[1].split(",")[0]);
        YESTERDAY_LOCAL_ACCUMULATIVE_P_HOURS   = parseFloat(my_array[1].split(",")[1]);
        YESTERDAY_LOCAL_ACCUMULATIVE_A_SORTIES = Number(my_array[2].split(",")[0]);
        YESTERDAY_LOCAL_ACCUMULATIVE_A_HOURS   = parseFloat(my_array[2].split(",")[1]);

        YESTERDAY_OVERSEAS_ACCUMULATIVE_T_SORTIES = Number(my_array[3].split(",")[0]);
        YESTERDAY_OVERSEAS_ACCUMULATIVE_T_HOURS   = parseFloat(my_array[3].split(",")[1]);
        YESTERDAY_OVERSEAS_ACCUMULATIVE_P_SORTIES = Number(my_array[4].split(",")[0]);
        YESTERDAY_OVERSEAS_ACCUMULATIVE_P_HOURS   = parseFloat(my_array[4].split(",")[1]);
        YESTERDAY_OVERSEAS_ACCUMULATIVE_A_SORTIES = Number(my_array[5].split(",")[0]);
        YESTERDAY_OVERSEAS_ACCUMULATIVE_A_HOURS   = parseFloat(my_array[5].split(",")[1]);

        YESTERDAY_ACCUMULATIVE_CXM1  = Number(my_array[6].split(",")[0]);
        YESTERDAY_ACCUMULATIVE_CXM2  = Number(my_array[6].split(",")[1]);
        YESTERDAY_ACCUMULATIVE_CXM3  = Number(my_array[6].split(",")[2]);
        YESTERDAY_ACCUMULATIVE_CXM4  = Number(my_array[6].split(",")[3]);
        YESTERDAY_ACCUMULATIVE_CXOPS = Number(my_array[6].split(",")[4]);
        YESTERDAY_ACCUMULATIVE_CXOTH = Number(my_array[6].split(",")[5]);
        YESTERDAY_ACCUMULATIVE_CXWX  = Number(my_array[6].split(",")[6]);
    }

    let WORKYEAR_ACCUMULATIVE_SORTIES = Number(my_array[7].split(",")[0]);
    let WORKYEAR_ACCUMULATIVE_HOURS   = Number(my_array[7].split(",")[1]);

    if (MON == 4 && my_array[9] == 3) {
        WORKYEAR_ACCUMULATIVE_SORTIES = 0;
        WORKYEAR_ACCUMULATIVE_HOURS   = 0;
    }

    // MOP 
    let MOP_T_LOCAL_SORTIES = Number(document.getElementById("MOP_T_LOCAL_SORTIES").value || my_array[8].split(",")[0]);
    let MOP_T_LOCAL_HOURS = parseFloat(document.getElementById("MOP_T_LOCAL_HOURS").value || my_array[8].split(",")[1]) ;
    let MOP_P_LOCAL_SORTIES = Number(document.getElementById("MOP_P_LOCAL_SORTIES").value || my_array[8].split(",")[2]);
    let MOP_P_LOCAL_HOURS = parseFloat(document.getElementById("MOP_P_LOCAL_HOURS").value || my_array[8].split(",")[3]);
                              
    let MOP_T_OVERSEAS_SORTIES = Number(document.getElementById("MOP_T_OVERSEAS_SORTIES").value || my_array[8].split(",")[4]);
    let MOP_T_OVERSEAS_HOURS = parseFloat(document.getElementById("MOP_T_OVERSEAS_HOURS").value || my_array[8].split(",")[5]);
    let MOP_P_OVERSEAS_SORTIES = Number(document.getElementById("MOP_P_OVERSEAS_SORTIES").value || my_array[8].split(",")[6]);
    let MOP_P_OVERSEAS_HOURS = parseFloat(document.getElementById("MOP_P_OVERSEAS_HOURS").value || my_array[8].split(",")[7]);

    let MOP_T_TOTAL_SORTIES = MOP_T_LOCAL_SORTIES + MOP_T_OVERSEAS_SORTIES;
    let MOP_T_TOTAL_HOURS = MOP_T_LOCAL_HOURS + MOP_T_OVERSEAS_HOURS;
    let MOP_P_TOTAL_SORTIES = MOP_P_LOCAL_SORTIES + MOP_P_OVERSEAS_SORTIES;
    let MOP_P_TOTAL_HOURS = MOP_P_LOCAL_HOURS + MOP_P_OVERSEAS_HOURS;

    let MOP_PERCENTAGE = (MOP_P_TOTAL_HOURS *100/ MOP_T_TOTAL_HOURS).toFixed(2);

    
    // DAILY
    let DAILY_T_LOCAL_SORTIES = Number(document.getElementById("DAILY_T_LOCAL_SORTIES").value) || 0;
    let DAILY_T_LOCAL_HOURS = parseFloat(document.getElementById("DAILY_T_LOCAL_HOURS").value) || 0;
    let DAILY_P_LOCAL_SORTIES = Number(document.getElementById("DAILY_P_LOCAL_SORTIES").value) || 0;
    let DAILY_P_LOCAL_HOURS = parseFloat(document.getElementById("DAILY_P_LOCAL_HOURS").value) || 0;
    let DAILY_A_LOCAL_SORTIES = Number(document.getElementById("DAILY_A_LOCAL_SORTIES").value) || 0;
    let DAILY_A_LOCAL_HOURS = parseFloat(document.getElementById("DAILY_A_LOCAL_HOURS").value) || 0;
    let DAILY_NEG_LOCAL_SORTIES = DAILY_A_LOCAL_SORTIES - DAILY_T_LOCAL_SORTIES;
    let DAILY_NEG_LOCAL_HOURS = DAILY_A_LOCAL_HOURS - DAILY_T_LOCAL_HOURS;

    let DAILY_T_OVERSEAS_SORTIES = Number(document.getElementById("DAILY_T_OVERSEAS_SORTIES").value) || 0;
    let DAILY_T_OVERSEAS_HOURS = parseFloat(document.getElementById("DAILY_T_OVERSEAS_HOURS").value) || 0;
    let DAILY_P_OVERSEAS_SORTIES = Number(document.getElementById("DAILY_P_OVERSEAS_SORTIES").value) || 0;
    let DAILY_P_OVERSEAS_HOURS = parseFloat(document.getElementById("DAILY_P_OVERSEAS_HOURS").value) || 0;
    let DAILY_A_OVERSEAS_SORTIES = Number(document.getElementById("DAILY_A_OVERSEAS_SORTIES").value) || 0;
    let DAILY_A_OVERSEAS_HOURS = parseFloat(document.getElementById("DAILY_A_OVERSEAS_HOURS").value) || 0;
    let DAILY_NEG_OVERSEAS_SORTIES = DAILY_A_OVERSEAS_SORTIES - DAILY_T_OVERSEAS_SORTIES;
    let DAILY_NEG_OVERSEAS_HOURS = DAILY_A_OVERSEAS_HOURS - DAILY_T_OVERSEAS_HOURS;

    //MONTHLY
    let DAILY_LOCAL_T_TOTAL_SORTIES   = DAILY_T_LOCAL_SORTIES   + YESTERDAY_LOCAL_ACCUMULATIVE_T_SORTIES; 
    let DAILY_LOCAL_T_TOTAL_HOURS     = DAILY_T_LOCAL_HOURS     + YESTERDAY_LOCAL_ACCUMULATIVE_T_HOURS; 
    let DAILY_LOCAL_P_TOTAL_SORTIES   = DAILY_P_LOCAL_SORTIES   + YESTERDAY_LOCAL_ACCUMULATIVE_P_SORTIES;
    let DAILY_LOCAL_P_TOTAL_HOURS     = DAILY_P_LOCAL_HOURS     + YESTERDAY_LOCAL_ACCUMULATIVE_P_HOURS; 
    let DAILY_LOCAL_A_TOTAL_SORTIES   = DAILY_A_LOCAL_SORTIES   + YESTERDAY_LOCAL_ACCUMULATIVE_A_SORTIES;
    let DAILY_LOCAL_A_TOTAL_HOURS     = DAILY_A_LOCAL_HOURS     + YESTERDAY_LOCAL_ACCUMULATIVE_A_HOURS; 
    let DAILY_LOCAL_NEG_TOTAL_SORTIES = DAILY_LOCAL_A_TOTAL_SORTIES - DAILY_LOCAL_T_TOTAL_SORTIES;
    let DAILY_LOCAL_NEG_TOTAL_HOURS   = DAILY_LOCAL_A_TOTAL_HOURS - DAILY_LOCAL_T_TOTAL_HOURS;

    let DAILY_OVERSEAS_T_TOTAL_SORTIES   = DAILY_T_OVERSEAS_SORTIES   + YESTERDAY_OVERSEAS_ACCUMULATIVE_T_SORTIES; 
    let DAILY_OVERSEAS_T_TOTAL_HOURS     = DAILY_T_OVERSEAS_HOURS     + YESTERDAY_OVERSEAS_ACCUMULATIVE_T_HOURS; 
    let DAILY_OVERSEAS_P_TOTAL_SORTIES   = DAILY_P_OVERSEAS_SORTIES   + YESTERDAY_OVERSEAS_ACCUMULATIVE_P_SORTIES;
    let DAILY_OVERSEAS_P_TOTAL_HOURS     = DAILY_P_OVERSEAS_HOURS     + YESTERDAY_OVERSEAS_ACCUMULATIVE_P_HOURS; 
    let DAILY_OVERSEAS_A_TOTAL_SORTIES   = DAILY_A_OVERSEAS_SORTIES   + YESTERDAY_OVERSEAS_ACCUMULATIVE_A_SORTIES;
    let DAILY_OVERSEAS_A_TOTAL_HOURS     = DAILY_A_OVERSEAS_HOURS     + YESTERDAY_OVERSEAS_ACCUMULATIVE_A_HOURS; 
    let DAILY_OVERSEAS_NEG_TOTAL_SORTIES = DAILY_OVERSEAS_A_TOTAL_SORTIES - DAILY_OVERSEAS_T_TOTAL_SORTIES;
    let DAILY_OVERSEAS_NEG_TOTAL_HOURS   = DAILY_OVERSEAS_A_TOTAL_HOURS - DAILY_OVERSEAS_T_TOTAL_HOURS;

    let DAILY_T_TOTAL_SORTIES   = DAILY_LOCAL_T_TOTAL_SORTIES    + DAILY_OVERSEAS_T_TOTAL_SORTIES   ;
    let DAILY_T_TOTAL_HOURS     = DAILY_LOCAL_T_TOTAL_HOURS      + DAILY_OVERSEAS_T_TOTAL_HOURS     ;
    let DAILY_P_TOTAL_SORTIES   = DAILY_LOCAL_P_TOTAL_SORTIES    + DAILY_OVERSEAS_P_TOTAL_SORTIES   ;
    let DAILY_P_TOTAL_HOURS     = DAILY_LOCAL_P_TOTAL_HOURS      + DAILY_OVERSEAS_P_TOTAL_HOURS     ;
    let DAILY_A_TOTAL_SORTIES   = DAILY_LOCAL_A_TOTAL_SORTIES    + DAILY_OVERSEAS_A_TOTAL_SORTIES   ;
    let DAILY_A_TOTAL_HOURS     = DAILY_LOCAL_A_TOTAL_HOURS      + DAILY_OVERSEAS_A_TOTAL_HOURS     ;
    let DAILY_NEG_TOTAL_SORTIES = DAILY_LOCAL_NEG_TOTAL_SORTIES  + DAILY_OVERSEAS_NEG_TOTAL_SORTIES ;
    let DAILY_NEG_TOTAL_HOURS   = DAILY_LOCAL_NEG_TOTAL_HOURS    + DAILY_OVERSEAS_NEG_TOTAL_HOURS   ;

    
    // CXMX FOR LOCAL AND OVERSEAS
    let LOCAL_CXM1 = Number(document.getElementById("LOCAL_CXM1").value);
    let LOCAL_CXM2 = Number(document.getElementById("LOCAL_CXM2").value);
    let LOCAL_CXM3 = Number(document.getElementById("LOCAL_CXM3").value);
    let LOCAL_CXM4 = Number(document.getElementById("LOCAL_CXM4").value);
    let LOCAL_CXOPS = Number(document.getElementById("LOCAL_CXOPS").value);
    let LOCAL_CXOTH = Number(document.getElementById("LOCAL_CXOTH").value);
    let LOCAL_CXWX = Number(document.getElementById("LOCAL_CXWX").value);
    let LOCAL_CXMX = LOCAL_CXM1 + LOCAL_CXM2 + LOCAL_CXM3 + LOCAL_CXM4;
    
    let sum = LOCAL_CXMX + LOCAL_CXOPS + LOCAL_CXOTH + LOCAL_CXWX + DAILY_A_LOCAL_SORTIES;
    if (Number(sum) - Number(DAILY_P_LOCAL_SORTIES) != 0) {
        document.getElementById("DAILY_P_LOCAL_SORTIES").style.borderColor = "red";
        alert(`Total CX + flying sorties for local != local planned sorties, sum: ${sum}, total: ${DAILY_P_LOCAL_SORTIES}`);
    }
    
    let OVERSEAS_CXM1 = Number(document.getElementById("OVERSEAS_CXM1").value);
    let OVERSEAS_CXM2 = Number(document.getElementById("OVERSEAS_CXM2").value);
    let OVERSEAS_CXM3 = Number(document.getElementById("OVERSEAS_CXM3").value);
    let OVERSEAS_CXM4 = Number(document.getElementById("OVERSEAS_CXM4").value);
    let OVERSEAS_CXOPS = Number(document.getElementById("OVERSEAS_CXOPS").value);
    let OVERSEAS_CXOTH = Number(document.getElementById("OVERSEAS_CXOTH").value);
    let OVERSEAS_CXWX = Number(document.getElementById("OVERSEAS_CXWX").value);
    let OVERSEAS_CXMX = OVERSEAS_CXM1 + OVERSEAS_CXM2 + OVERSEAS_CXM3 + OVERSEAS_CXM4;
    
    
    sum = OVERSEAS_CXMX + OVERSEAS_CXOPS + OVERSEAS_CXOTH + OVERSEAS_CXWX + DAILY_A_OVERSEAS_SORTIES;
    if (Number(sum) - Number(DAILY_P_OVERSEAS_SORTIES) != 0) {
        document.getElementById("DAILY_P_OVERSEAS_SORTIES").style.borderColor = "red";
        alert(`Total CX + flying sorties for overseas != overseas planned sorties, sum: ${sum}, total: ${DAILY_P_OVERSEAS_SORTIES}`);
    }
    
    // CALCULATE TODAY ACCUMULATIVE
    let TODAY_ACCUMULATIVE_CXM1 =  LOCAL_CXM1  + YESTERDAY_ACCUMULATIVE_CXM1  + OVERSEAS_CXM1 ;
    let TODAY_ACCUMULATIVE_CXM2 =  LOCAL_CXM2  + YESTERDAY_ACCUMULATIVE_CXM2  + OVERSEAS_CXM2 ;
    let TODAY_ACCUMULATIVE_CXM3 =  LOCAL_CXM3  + YESTERDAY_ACCUMULATIVE_CXM3  + OVERSEAS_CXM3 ;
    let TODAY_ACCUMULATIVE_CXM4 =  LOCAL_CXM4  + YESTERDAY_ACCUMULATIVE_CXM4  + OVERSEAS_CXM4 ;
    let TODAY_ACCUMULATIVE_CXOPS = LOCAL_CXOPS + YESTERDAY_ACCUMULATIVE_CXOPS + OVERSEAS_CXOPS;
    let TODAY_ACCUMULATIVE_CXOTH = LOCAL_CXOTH + YESTERDAY_ACCUMULATIVE_CXOTH + OVERSEAS_CXOTH;
    let TODAY_ACCUMULATIVE_CXWX = LOCAL_CXWX + YESTERDAY_ACCUMULATIVE_CXWX + OVERSEAS_CXWX;
    
    //if (DAY >= lastFridayOfMonth(YEAR, MON)) {
    //    MOP_T_LOCAL_SORTIES    = DAILY_LOCAL_T_TOTAL_SORTIES ;
    //    MOP_T_LOCAL_HOURS      = DAILY_LOCAL_T_TOTAL_HOURS   ; 
    //    MOP_P_LOCAL_SORTIES    = DAILY_LOCAL_P_TOTAL_SORTIES ;
    //    MOP_P_LOCAL_HOURS      = DAILY_LOCAL_P_TOTAL_HOURS   ;  
                              
    //    MOP_T_OVERSEAS_SORTIES = DAILY_OVERSEAS_T_TOTAL_SORTIES ;
    //    MOP_T_OVERSEAS_HOURS   = DAILY_OVERSEAS_T_TOTAL_HOURS   ;
    //    MOP_P_OVERSEAS_SORTIES = DAILY_OVERSEAS_P_TOTAL_SORTIES ;
    //    MOP_P_OVERSEAS_HOURS   = DAILY_OVERSEAS_P_TOTAL_HOURS   ;
    //    MOP_T_TOTAL_SORTIES = MOP_T_LOCAL_SORTIES + MOP_T_OVERSEAS_SORTIES;
    //    MOP_T_TOTAL_HOURS = MOP_T_LOCAL_HOURS + MOP_T_OVERSEAS_HOURS;
    //    MOP_P_TOTAL_SORTIES = MOP_P_LOCAL_SORTIES + MOP_P_OVERSEAS_SORTIES;
    //    MOP_P_TOTAL_HOURS = MOP_P_LOCAL_HOURS + MOP_P_OVERSEAS_HOURS;

    //   MOP_PERCENTAGE = (MOP_P_TOTAL_HOURS *100/ MOP_T_TOTAL_HOURS).toFixed(2);
    //}
    
    // CALCULATE PERCENTAGE
    let FORECASTED_ACHEIVED = (MOP_P_TOTAL_HOURS - DAILY_P_TOTAL_HOURS + DAILY_A_TOTAL_HOURS) * 100 / MOP_T_TOTAL_HOURS;
    let CURRENT_ACHEIVED = DAILY_A_TOTAL_HOURS * 100 / DAILY_T_TOTAL_HOURS;
    
    if (FORECASTED_ACHEIVED == Infinity || FORECASTED_ACHEIVED == -Infinity) {
        alert("MOP tasked total hours is 0, so forecasted and current achieved is infinity")
    }
    
    // CALCULATE WORKYEAR
    let wk1 = WORKYEAR_ACCUMULATIVE_SORTIES + (DAILY_A_LOCAL_SORTIES + DAILY_A_OVERSEAS_SORTIES - DAILY_T_LOCAL_SORTIES - DAILY_T_OVERSEAS_SORTIES) ;
    let wk2 = WORKYEAR_ACCUMULATIVE_HOURS + (DAILY_A_LOCAL_HOURS + DAILY_A_OVERSEAS_HOURS - DAILY_T_LOCAL_HOURS - DAILY_T_OVERSEAS_HOURS);
    
    if (error == true) {
        return;
    }                       
    // COMPILE THE MESSAGES
    let msg1 = `Good day sirs, here are the stats for today. Thank you sirs                                                                                                                                        
    
Month of ${MONTH} ${YEAR}             
    
Local              
    
<T> ${MOP_T_LOCAL_SORTIES} / ${MOP_T_LOCAL_HOURS.toFixed(1)}           
<P> ${MOP_P_LOCAL_SORTIES} / ${MOP_P_LOCAL_HOURS.toFixed(1)}         
    
Overseas              
    
<T> ${MOP_T_OVERSEAS_SORTIES} / ${MOP_T_OVERSEAS_HOURS.toFixed(1)}            
<P> ${MOP_P_OVERSEAS_SORTIES} / ${MOP_P_OVERSEAS_HOURS.toFixed(1)}                                                                            
                                                                                            
Total                                                                                                                                            
                                                                                                                                    
<T> ${MOP_T_TOTAL_SORTIES} / ${MOP_T_TOTAL_HOURS.toFixed(1)}                                                                                                   
<P> ${MOP_P_TOTAL_SORTIES} / ${MOP_P_TOTAL_HOURS.toFixed(1)}                                                       
                                                                                                    
${MOP_PERCENTAGE}%                                                                                           
=============================
\`DAILY - ${DAY} ${MONTH}\`
`
    if (DAILY_P_LOCAL_SORTIES != 0) {
        msg1 = msg1 + `LOCAL                                                                          
                                                                
<T> ${DAILY_T_LOCAL_SORTIES} / ${DAILY_T_LOCAL_HOURS.toFixed(1)}                                            
<P> ${DAILY_P_LOCAL_SORTIES} / ${DAILY_P_LOCAL_HOURS.toFixed(1)}                            
<A> ${DAILY_A_LOCAL_SORTIES} / ${DAILY_A_LOCAL_HOURS.toFixed(1)}         
    
**${DAILY_NEG_LOCAL_SORTIES} / ${DAILY_NEG_LOCAL_HOURS.toFixed(1)}**\n`
if (LOCAL_CXM1 != 0) {
    msg1 += `${LOCAL_CXM1}CXM1\n`
}
if (LOCAL_CXM2 != 0) {
    msg1 += `${LOCAL_CXM2}CXM2\n`
}
if (LOCAL_CXM3 != 0) {
    msg1 += `${LOCAL_CXM3}CXM3\n`
}
if (LOCAL_CXM4 != 0) {
    msg1 += `${LOCAL_CXM4}CXM4\n`
}
if (LOCAL_CXOPS != 0) {
    msg1 += `${LOCAL_CXOPS}CXOPS\n`
}
if (LOCAL_CXOTH != 0) {
    msg1 += `${LOCAL_CXOTH}CXOTH\n`
}
if (LOCAL_CXWX != 0) {
    msg1 += `${LOCAL_CXWX}CXWX\n`
} 
} 
    if (DAILY_P_OVERSEAS_SORTIES != 0) {
        msg1 = msg1 + `



OVERSEAS              
    
<T> ${DAILY_T_OVERSEAS_SORTIES} / ${DAILY_T_OVERSEAS_HOURS.toFixed(1)}       
<P> ${DAILY_P_OVERSEAS_SORTIES} / ${DAILY_P_OVERSEAS_HOURS.toFixed(1)}        
<A> ${DAILY_A_OVERSEAS_SORTIES} / ${DAILY_A_OVERSEAS_HOURS.toFixed(1)}   
    
**${DAILY_NEG_OVERSEAS_SORTIES} / ${DAILY_NEG_OVERSEAS_HOURS.toFixed(1)}**\n`

if (OVERSEAS_CXM1 != 0) {
    msg1 += `${OVERSEAS_CXM1}CXM1\n`
}
if (OVERSEAS_CXM2 != 0) {
    msg1 += `${OVERSEAS_CXM2}CXM2\n`
}
if (OVERSEAS_CXM3 != 0) {
    msg1 += `${OVERSEAS_CXM3}CXM3\n`
}
if (OVERSEAS_CXM4 != 0) {
    msg1 += `${OVERSEAS_CXM4}CXM4\n`
}
if (OVERSEAS_CXOPS != 0) {
    msg1 += `${OVERSEAS_CXOPS}CXOPS\n`
}
if (OVERSEAS_CXOTH != 0) {
    msg1 += `${OVERSEAS_CXOTH}CXOTH\n`
}
if (OVERSEAS_CXWX != 0) {
    msg1 += `${OVERSEAS_CXWX}CXWX\n`
}
}                                                                                                                                                        
    msg1 = msg1 + `

    
=============================           
\`MONTHLY - ${MONTH}\`
    
`                
    
    if (DAILY_LOCAL_P_TOTAL_SORTIES != 0) {
        msg1 = msg1 + `LOCAL                                                                          


<T> ${DAILY_LOCAL_T_TOTAL_SORTIES} / ${DAILY_LOCAL_T_TOTAL_HOURS.toFixed(1)}                  
<P> ${DAILY_LOCAL_P_TOTAL_SORTIES} / ${DAILY_LOCAL_P_TOTAL_HOURS.toFixed(1)}                             
<A> ${DAILY_LOCAL_A_TOTAL_SORTIES} / ${DAILY_LOCAL_A_TOTAL_HOURS.toFixed(1)}                            
                                                                
**${DAILY_LOCAL_NEG_TOTAL_SORTIES } / ${DAILY_LOCAL_NEG_TOTAL_HOURS.toFixed(1)}**

`
    }
    if (DAILY_OVERSEAS_P_TOTAL_SORTIES != 0) {
        msg1 = msg1 + `OVERSEAS              
    
<T> ${DAILY_OVERSEAS_T_TOTAL_SORTIES} / ${DAILY_OVERSEAS_T_TOTAL_HOURS.toFixed(1)}                  
<P> ${DAILY_OVERSEAS_P_TOTAL_SORTIES} / ${DAILY_OVERSEAS_P_TOTAL_HOURS.toFixed(1)}                             
<A> ${DAILY_OVERSEAS_A_TOTAL_SORTIES} / ${DAILY_OVERSEAS_A_TOTAL_HOURS.toFixed(1)}                            
                                                                
**${DAILY_OVERSEAS_NEG_TOTAL_SORTIES } / ${DAILY_OVERSEAS_NEG_TOTAL_HOURS.toFixed(1)}**
            
`
    }                                                         
    msg1 = msg1 + `TOTAL              
    
<T> ${DAILY_T_TOTAL_SORTIES} / ${DAILY_T_TOTAL_HOURS.toFixed(1)}                  
<P> ${DAILY_P_TOTAL_SORTIES} / ${DAILY_P_TOTAL_HOURS.toFixed(1)}                             
<A> ${DAILY_A_TOTAL_SORTIES} / ${DAILY_A_TOTAL_HOURS.toFixed(1)}  

`

    if (TODAY_ACCUMULATIVE_CXM1 != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXM1}CXM1\n`
    }
    if (TODAY_ACCUMULATIVE_CXM2 != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXM2}CXM2\n`
    }
    if (TODAY_ACCUMULATIVE_CXM3 != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXM3}CXM3\n`
    }
    if (TODAY_ACCUMULATIVE_CXM4 != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXM4}CXM4\n`
    }
    if (TODAY_ACCUMULATIVE_CXOPS != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXOPS}CXOPS\n`
    }
    if (TODAY_ACCUMULATIVE_CXOTH != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXOTH}CXOTH\n`
    }
    if (TODAY_ACCUMULATIVE_CXWX != 0) {
        msg1 += `${TODAY_ACCUMULATIVE_CXWX}CXWX\n`
    }                                                                                                
    msg1 += `

**${DAILY_NEG_TOTAL_SORTIES} / ${DAILY_NEG_TOTAL_HOURS.toFixed(1)}**
                                                                                    
Achieved % for the month:                                                                                                                                            
                                                                                                                                    
Forecasted Achieved: ${FORECASTED_ACHEIVED.toFixed(2)}%                                                                                                                                            
Current Achieved:    ${CURRENT_ACHEIVED.toFixed(2)}%  

Workyear:      
${wk1} / ${wk2.toFixed(1)}`;
let msg2 = `${DAILY_LOCAL_T_TOTAL_SORTIES},${DAILY_LOCAL_T_TOTAL_HOURS.toFixed(1)}                  
${DAILY_LOCAL_P_TOTAL_SORTIES},${DAILY_LOCAL_P_TOTAL_HOURS.toFixed(1)}                             
${DAILY_LOCAL_A_TOTAL_SORTIES},${DAILY_LOCAL_A_TOTAL_HOURS.toFixed(1)}                                    
${DAILY_OVERSEAS_T_TOTAL_SORTIES},${DAILY_OVERSEAS_T_TOTAL_HOURS.toFixed(1)}                  
${DAILY_OVERSEAS_P_TOTAL_SORTIES},${DAILY_OVERSEAS_P_TOTAL_HOURS.toFixed(1)}                             
${DAILY_OVERSEAS_A_TOTAL_SORTIES},${DAILY_OVERSEAS_A_TOTAL_HOURS.toFixed(1)}
${TODAY_ACCUMULATIVE_CXM1},${TODAY_ACCUMULATIVE_CXM2},${TODAY_ACCUMULATIVE_CXM3},${TODAY_ACCUMULATIVE_CXM4},${TODAY_ACCUMULATIVE_CXOPS},${TODAY_ACCUMULATIVE_CXOTH},${TODAY_ACCUMULATIVE_CXWX}
${wk1.toFixed(1)},${wk2.toFixed(1)}
${MOP_T_LOCAL_SORTIES},${MOP_T_LOCAL_HOURS},${MOP_P_LOCAL_SORTIES},${MOP_P_LOCAL_HOURS},${MOP_T_OVERSEAS_SORTIES},${MOP_T_OVERSEAS_HOURS},${MOP_P_OVERSEAS_SORTIES},${MOP_P_OVERSEAS_HOURS}
${MON}`;
    document.getElementById("message").value = msg1;
    document.getElementById("stats").value = msg2;
}
