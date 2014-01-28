<cfsilent>
	
	<!--- If the user is not logged in send them to the login page --->
	<cfif NOT structKeyExists(session, 'ystLogin')>
		<cflocation url="/yst/index.cfm" addtoken="false">
	</cfif>
	
	<!--- Get the player details from the database --->
	<cfquery datasource="#application.defaultProperties.datasourceName#" name="qGetPlayerDetails">
		SELECT *
		FROM tblbranding
		WHERE brandingId = <cfqueryparam cfsqltype="cf_sql_integer" value="14">
	</cfquery>
	
	<!--- If this is not an HTML5 version send to the flash player --->
	<cfif NOT qGetPlayerDetails.isHTML5>
		<cflocation url="http://dev.talkingjobs.net/player/poweredby.cfm?id=9F0FDC&brandLink=#qGetPlayerDetails.linkId#" addtoken="false">
	</cfif>
</cfsilent>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Talking Jobs YST Login</title>

    <!-- Bootstrap core CSS -->
    <link href="/yst/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/yst/css/yst.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    
    <!--- HTML5 PLAYER VARIABLES FROM JP --->
    <script type="text/javascript">
    	var title="<cfoutput>#qGetPlayerDetails.title#</cfoutput>",
	xmlFile="<cfoutput>#application.siteURL#player/xml_schools/#qGetPlayerDetails.html5XmlFile#.xml</cfoutput>",
	questionFile="<cfoutput>#application.siteURL#player/xml_schools/#qGetPlayerDetails.html5QuestionXmlFile#.xml</cfoutput>"; 	
		
	alert(xmlFile);
    </script>
    
    <!--- IF YOU WANT TO SEE ALL THE VARIABLES STORED IN THE DB ABOUT THIS MODULE UNCOMMENT THE ROW BELOW --->
    <!--- <cfdump var="#qGetPlayerDetails#"><cfabort> --->
    
  </head>

  <body>

    <div class="container">

      PLAYER TO GO HERE

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
  </body>
</html>