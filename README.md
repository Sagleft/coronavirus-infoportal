# coronavirus-infoportal
Web portal. Cyprus Coronavirus Infection Information

## Требования

* PHP >=7.2;
* Apache ~2.3;

Разобрать файлы, создать папки, выдать права и тд:

```bash
sh install.sh
```

затем обновить кеш данных:

```bash
cd controller/cron
php updateTimeseries.php
```

Пример конфигурации виртуального хоста для Apache:

```
<VirtualHost *:80>
  ServerName cvirportal
  ServerAlias cvirportal
  DocumentRoot /var/www/cvirportal/controller/public_html
  <Directory /var/www/cvirportal/controller/public_html>
  Options FollowSymLinks
  AllowOverride All
  Require all granted
  </Directory>
  ErrorLog /var/www/cvirportal/logs/error.log
  CustomLog /var/www/cvirportal/logs/access.log common
  php_admin_value date.timezone 'Asia/Nicosia'
  php_admin_value max_execution_time 60
</VirtualHost>
```

в крон добавить выполнение раз в день скрипт:

```
controller/cron/updateTimeseries.php
```

---

![image](https://github.com/Sagleft/Sagleft/raw/master/image.png)

### :globe_with_meridians: [Telegram канал](https://t.me/+VIvd8j6xvm9iMzhi)
