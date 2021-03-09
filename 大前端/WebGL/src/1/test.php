$realIp = $_SERVER['HTTP_X_FORWARD_FOR'] ||
        $_SERVER['HTTP_X_FORWARD_FOR']  ||
        $_SERVER['HTTP_CLIENT_IP']  ||
        $_SERVER['REMOTE_ADDR'] ||
        'error ip';

