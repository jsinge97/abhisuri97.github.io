
      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});
      
      // Set a callback to run when the Google Visualization API is loaded.

      google.setOnLoadCallback(drawChart);



      // Callback that creates and populates a data table, 
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

      // Create the data table.
      var jsonData = jQuery.ajax({
          url: 'function.php',
          dataType: "json",
          data: 'action=nform_chart&type=byform',
          async: false
          }).responseText;
          
      // Create our data table out of JSON data loaded from server.
      var data = new google.visualization.DataTable(jsonData);
      options = new Object();
      options.title='Submissions by Form Name';
options.is3D = true;    
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);




      // Chart Two

      // Create the data table.
      var jsonData = jQuery.ajax({
          url: 'function.php',
          dataType: "json",
          data: 'action=nform_chart2',
          async: false
          }).responseText;
          
      // Create our data table out of JSON data loaded from server.
      var data = new google.visualization.DataTable(jsonData);
var d=new Date();
var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";
options=new Object();
options.title = 'Form Submissions in '+month[d.getMonth()];
options.chartArea = new Object();
options.min = 0;
options.hAxis = new Object();
options.hAxis.title = 'Day of the Month';
options.vAxis = new Object();
options.vAxis.title = 'Submissions';

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
      }



      function setupLabel() {

  if (jQuery('.label_check input').length) {
    jQuery('.label_check').each(function(){ 
      jQuery(this).removeClass('c_on');
    });
    jQuery('.label_check input:checked').each(function(){ 
      jQuery(this).parent('label').addClass('c_on');
    });                
  };
  if (jQuery('.label_radio input').length) {
    jQuery('.label_radio').each(function(){ 
      jQuery(this).removeClass('r_on');

    });
    jQuery('.label_radio input:checked').each(function(){ 
      jQuery(this).parent('label').addClass('r_on');
    });
  };
};


jQuery(document).ready(function () {

setupLabel();
  jQuery('body').addClass('has-js');
  jQuery('body').on("click",'.label_check, .label_radio' , function(){
    setupLabel();
  });

  jQuery('#unr_ind2').html(jQuery('#files_manager_table tr').length-1);
});