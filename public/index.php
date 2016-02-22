<!doctype html>
<html>
<head>
  <title>test</title>
  <script src="../jspm_packages/system.js"></script>
  <script src="../config.js"></script>
  <script src="js/global.min.js"></script>
  <!--<script src="js/Chat.min.js"></script>-->
  <script>
    System.import(location.pathname +'js/Chat.min.js').then(function(Chat){
      nike.log('Chat component loaded');
      new Chat();
    });
  </script>
</head>
<body>

</body>