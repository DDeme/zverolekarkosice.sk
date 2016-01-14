<?php

/**
 * Contact form for zverolekarkosice.sk
 * Author: daniel@demecko.com
 */

error_reporting(-1);

require_once 'PHPMailer/PHPMailerAutoload.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {


if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputMessage']) && isset($_POST['validate']) ) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Vyplňte prosím správne formulár.');
        echo json_encode($data);
        exit;
    }

    $crypt = new Crypt;
    $decoded = $crypt->decrypt($_POST['validate']);
    $decoded = substr_replace($decoded, "", -1);

    if ( ($decoded + 86400)>= time() &&  $decoded <= (time() - 86400 ) ) {
        $data = array('success' => false, 'message' => 'Vypršal čas načítajte stránku znovu.');
        echo json_encode($data);
        exit;
    }


    $pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';
    if (preg_match($pattern, $_POST['inputName']) || preg_match($pattern, $_POST['inputEmail']) || preg_match($pattern, $_POST['inputMessage'])) {
        die("Header injection detected");
    }


    //create an instance of PHPMailer
    $mail = new PHPMailer;
    $mail->setLanguage('sk');
    $mail->CharSet = 'UTF-8';
    $mail->AddReplyTo($_POST['inputEmail']);
    $mail->From ='info@zverolekarkosice.sk';
    $mail->FromName = 'Zverolekarkosice.sk';

    //$mail->FromName = $_POST['inputName'];
    $mail->AddAddress('skalicky.vladimir@gmail.com'); //recipient
    $mail->AddBCC($_POST['inputEmail']);
    $mail->Subject = "Kontaktný formulár na stránke zverolekarkosice.sk";
    $mail->Body = "Email: " . $_POST['inputEmail'] . "\r\n\r\nMeno: " . $_POST['inputName'] . "\r\n\r\nSpráva: " . stripslashes($_POST['inputMessage']);

    $mail_to_sender = new PHPMailer;
    $mail_to_sender->setLanguage('sk');
    $mail_to_sender->CharSet = 'UTF-8';
    //$mail_to_sender->AddReplyTo($_POST['inputEmail']);
    $mail_to_sender->From ='info@zverolekarkosice.sk';
    $mail_to_sender->FromName = 'Zverolekarkosice.sk';
    $mail_to_sender->AddAddress($_POST['inputEmail']); //recipient
    //$mail->AddBCC($_POST['inputEmail']);
    $mail_to_sender->Subject = "Kontaktný formulár na stránke zverolekarkosice.sk";
    $mail_to_sender->Body = "Vaša správa z kontaktného formulára zverolekarkosice.sk bola doručená. Budeme vás kontaktovať. .\r\n\r\nKópia Vašej správy:\r\n\r\n  Email: " . $_POST['inputEmail'] . "\r\n\r\nMeno: " . $_POST['inputName'] . "\r\n\r\nSpráva: " . stripslashes($_POST['inputMessage']);





    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send() && !$mail_to_sender->send()) {
        $data = array('success' => false, 'message' => 'Nastala chyba správa nebola odoslaná.' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Správa bola odoslaná');
    echo json_encode($data);

}
else {
    $data = array('success' => false, 'message' => 'Prosím vyplnte správne formulár');
    echo json_encode($data);
}

}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

if (strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST']) !== FALSE) {

    // a new proCrypt instance
    $crypt = new Crypt;

    // encrypt the string
    $encoded = $crypt->encrypt(time().rand (1,9));

    // decrypt the string
    $decoded = $crypt->decrypt($encoded);

    ?>
    <form ng-submit="submit(contactform)" name="contactform" ng-init="formData.validate='<?php echo $encoded; ?>'">
      <div class="form-group">
        <label for="email" class="hidden">Email</label>
        <input ng-model="formData.inputEmail" type="email" name="email" class="form-control" id="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <label for="name" class="hidden">Meno</label>
        <input ng-model="formData.inputName" type="text" name="name" class="form-control" id="name" placeholder="Meno" required>
      </div>
      <div class="form-group">
        <label for="msg" class="hidden">Vaša správa</label>
        <textarea ng-model="formData.inputMessage" name="msg" class="form-control" placeholder="Vaša správa" rows="10" id="msg" required></textarea>
      </div>
      <p ng-class="result">{{ resultMessage }}</p>
      <button type="submit" class="btn btn-default col-xs-12" ng-disabled="submitButtonDisabled">Odoslať</button>
    </form>
    <?php
}

else {

    header("Location: http://".$_SERVER['HTTP_HOST']);
    exit;
}

}


    /*
     * PHP mcrypt - Class to provide 2 way encryption of data
     */

    class Crypt {

        private $secretkey = 'hRWkFxM74VZ8vZ9v';

        //Encrypts a string
        public function encrypt($text) {
            $data = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $this->secretkey, $text, MCRYPT_MODE_ECB, 'keee');
            return base64_encode($data);
        }

        //Decrypts a string
        public function decrypt($text) {
            $text = base64_decode($text);
            return mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $this->secretkey, $text, MCRYPT_MODE_ECB, 'keee');
        }

    }




?>
