import{_ as h}from"./chunks/ArticleMetadata.CkeQ1Cwq.js";import{_ as k,m as t,a as r,u as c,B as d,e as n,x as y,ah as g,o as l,p as D,q as A}from"./chunks/framework.Bi-mNMmX.js";import"./chunks/theme.BaTNwBwr.js";const E=JSON.parse('{"title":"Redis配置文件详解","description":"","frontmatter":{"title":"Redis配置文件详解","author":"Noah","date":"2024/07/07 15:32","categories":["Redis进阶"],"tags":["Redis","Redis进阶"]},"headers":[],"relativePath":"courses/数据库/04-Redis进阶/01-Redis配置文件详解.md","filePath":"courses/数据库/04-Redis进阶/01-Redis配置文件详解.md","lastUpdated":1720612269000}'),o={name:"courses/数据库/04-Redis进阶/01-Redis配置文件详解.md"},F=n("h1",{id:"redis配置文件详解",tabindex:"-1"},[y("Redis配置文件详解 "),n("a",{class:"header-anchor",href:"#redis配置文件详解","aria-label":'Permalink to "Redis配置文件详解"'},"​")],-1),m=g(`<nav class="table-of-contents"><ul></ul></nav><p>Redis 的配置文件通常位于 <code>redis.conf</code> ，在 Redis 启动的的时候，可以自定义配置文件启动以达到伪集群的效果。通过配置文件可以调节 Redis 的行为和性能。</p><details class="details custom-block"><summary>redis.conf 查看</summary><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis 配置文件样本</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意：如果想要读取配置文件的参数，必须将配置文件以第一参数的形式启动，如下启动示例:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># ./redis-server /path/to/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 单位说明：当需要设置内存大小时，可以用1K 5GB 4M等常用格式指定：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1k =&gt; 1000 bytes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1kb =&gt; 1024 bytes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1m =&gt; 1000000 bytes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1mb =&gt; 1024*1024 bytes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1g =&gt; 1000000000 bytes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1gb =&gt; 1024*1024*1024 bytes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 单位不区分大小写 所以 1GB 1Gb 1gB 都是一样的.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################## 多包含 ###################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在此处包含一个或多个其他配置文件。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果您有一个标准模板，该模板可用于所有Redis服务器，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但还需要自定义每个服务器的一些设置，则此模板非常有用。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># include文件可以包括其他文件，因此请聪明地使用它。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意选项“include”不会被来自admin或redis sentinel的命令“config rewrite”重写。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 因为redis总是使用最后处理的行作为配置指令的值，所以最好将include放在该文件的开头，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 以避免在运行时覆盖配置更改。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 反之如果您对使用include覆盖配置选项感兴趣，最好使用include作为最后一行。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># include /path/to/local.conf</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># include /path/to/other.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################## 多模块 #####################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启动时加载模块。如果服务器无法加载模块，它将中止。可以使用多个loadmodule指令。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># loadmodule /path/to/my_module.so</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># loadmodule /path/to/other_module.so</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################## 网络 #####################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下如果没有指定bind配置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis侦听服务器上所有可用网络接口的连接（指的是网卡）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 可以使用“bind”配置指令只侦听一个或多个选定的接口，后跟一个或多个IP地址。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Examples:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># bind 192.168.1.100 10.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># bind 127.0.0.1 ::1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># ~~~ 警告 ~~~ 如果运行Redis的计算机直接暴露在Internet上，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 绑定到所有接口是危险的，并且会将实例暴露给互联网上的每个人。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 因此，默认情况下，设置了bind 127.0.0.1，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这意味着Redis只能接受运行在同一台计算机上的客户端的连接。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果您确定希望实例监听所有接口</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 只需要注释下面这一行.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">bind</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 127.0.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 保护模式是一个安全保护层，为了避免在Internet上打开的Redis实例被访问和利用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当保护模式打开时，如果:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) 服务器没有使用“bind”指令显式绑定到一组地址。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) 未配置密码。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 服务器只接受来自从IPv4和IPv6内网地址</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 127.0.0.1和：：1连接的客户端以及来自Unix域socket的连接。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下启用保护模式。 只有当您确定希望来自其他主机的客户机连接到Redis时，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 您才应该禁用它，即使没有配置身份验证，也没有使用“bind”指令显式列出特定的接口集。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">protected-mode</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定端口上的连接，默认值为6379</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果指定了端口0，Redis将不会侦听TCP连接。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">port</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># TCP listen() backlog.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在每秒高请求数的环境中，为了避免客户机连接速度慢的问题，您需要大量backlog。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 请注意，Linux内核将自动将其截断为/proc/sys/net/core/somaxconn的值，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 因此请确保同时提高somaxconn和tcp-max-syn-u backlog的值，以获得所需的效果。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">tcp-backlog</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 511</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Unix socket.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定将用于侦听传入连接的Unix socket的路径。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 没有默认值，因此未指定时，redis不会在UNIX socket上侦听。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># unixsocket /tmp/redis.sock</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># unixsocketperm 700</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 客户端空闲n秒后关闭连接（0表示禁用）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># TCP keepalive.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果非零，则使用so-keepalive在没有通信的情况下向客户机发送TCP ACK。这有两个原因:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) 能够检测无响应的服务</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) 让该连接中间的网络设备知道这个连接还存活</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在Linux上，这个指定的值(单位秒)就是发送ACK的时间间隔。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意：要关闭这个连接需要两倍的这个时间值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在其他内核上这个时间间隔由内核配置决定</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">tcp-keepalive</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 300</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################# 常用 #####################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下，redis不作为守护进程运行。如果需要，请使用“是”。请注意，当后台监控时，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># redis将在/var/run/redis.pid中写入一个pid文件。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">daemonize</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 是否通过upstart或systemd管理守护进程。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认no没有服务监控，其它选项有upstart, systemd, auto。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">supervised</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 生成的pid文件位置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">pidfile</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /var/run/redis_6379.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定服务器日志级别</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 可以配置为其中一个参数:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># debug (a lot of information, useful for development/testing)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># verbose (many rarely useful info, but not a mess like the debug level)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># notice (moderately verbose, what you want in production probably)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># warning (only very important / critical messages are logged)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">loglevel</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> notice</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定日志文件名。空字符串还可以用于强制redis记录标准输出</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 请注意，如果使用标准输出进行日志记录，但使用后台监控，则日志将发送到/dev/null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">logfile</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启用系统日志记录, 只需要设置 &#39;syslog-enabled&#39; 为 yes,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 还可以根据需要更新其他系统日志参数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># syslog-enabled no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定系统日志标识</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># syslog-ident redis</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定系统日志功能。必须是用户或介于 LOCAL0-LOCAL7.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># syslog-facility local0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 设置数据库数。默认数据库为db0,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 您可以使用select&lt;dbid&gt;在每个连接上选择不同的连接</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">databases</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 16</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># redis启动时是否显示Logo</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">always-show-logo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################  快照  ################################</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 保存数据到硬盘（持久化）:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   save &lt;seconds&gt; &lt;changes&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   如果在&lt;seconds&gt;秒后执行过&lt;changes&gt;次改变将会保存到硬盘</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   save 900 1 表示如果在900秒后至少发生了1次改变就会保存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   save 300 10 表示如果在300秒后至少发生了10次改变就会保存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   save save 60 10000 表示如果在60秒后至少发生了10000次改变就会保存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   注意：你可以注释掉所有的 save 行来停用保存功能。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   也可以直接一个空字符串来实现停用：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   save &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">save</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 900</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">save</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 300</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">save</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 60</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下，如果 redis 最后一次的后台保存失败，redis 将停止接受写操作，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这样以一种强硬的方式让用户知道数据不能正确的持久化到磁盘，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 否则就会没人注意到灾难的发生。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果后台保存进程重新启动工作了，redis 也将自动的允许写操作。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 然而你要是安装了靠谱的监控，你可能不希望 redis 这样做，那你就改成 no 好了。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">stop-writes-on-bgsave-error</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 是否在 dump .rdb 数据库的时候使用 LZF 压缩字符串</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认都设为 yes</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果你希望保存子进程节省点 cpu ，你就设置它为 no ，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 不过这个数据集可能就会比较大</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">rdbcompression</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 是否校验rdb文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">rdbchecksum</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># dump文件名</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">dbfilename</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> dump.rdb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 工作目录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 例如上面的 dbfilename 只指定了文件名，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是它会写入到这个目录下。这个配置项一定是个目录，而不能是文件名。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">dir</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> ./</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################# 复制 #################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 主从复制. 使用replicoaf将一个redis实例作为另一个redis服务器的副本，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 只需要在从服务器配置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># A few things to understand ASAP about Redis replication.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   |      Master      | ---&gt; |    Replica    |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   | (receive writes) |      |  (exact copy) |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   +------------------+      +---------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) Redis复制是异步的, but you can configure a master to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    stop accepting writes if it appears to be not connected with at least</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    a given number of replicas.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) 如果复制链接丢失的时间相对较短，Redis副本可以执行与主服务器的部分重新同步。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    根据需要，您可能需要使用合理的值配置复制积压工作的大小（请参阅此文件的下一节）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 3) 复制是自动的，不需要用户干预。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    在网络分区复制副本自动尝试重新连接到主服务器并与主服务器重新同步之后。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># replicaof &lt;masterip&gt; &lt;masterport&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 同步的主服务的密码</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># masterauth &lt;master-password&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当一个从服务失去和主服务的连接，或者同步正在进行中，副本可以以两种不同的方式进行操作：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) 如果 replica-serve-stale-data 设置为 &quot;yes&quot; (默认值)，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    从服务器会继续响应客户端请求，可能是正常数据，也可能是还没获得值的空数据。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) 如果 replica-serve-stale-data 设置为 &quot;no&quot;，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    从服务会回复&quot;正在从主服务同步（SYNC with master in progress）&quot;来处理各种请求，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    除了 INFO, replicaOF, AUTH, PING, SHUTDOWN, REPLCONF, ROLE, CONFIG,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    SUBSCRIBE, UNSUBSCRIBE, PSUBSCRIBE, PUNSUBSCRIBE, PUBLISH, PUBSUB,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    COMMAND, POST, HOST: and LATENCY。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">replica-serve-stale-data</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 你可以配置从服务实例是否接受写操作。可写的从服务实例可能对存储临时数据可能很有用(因为</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 写入从服务的数据在同主服务同步之后将很容被删除)，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是如果客户端由于配置错误在写入时也可能导致问题。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 从Redis2.6默认所有的从服务为只读</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意:只读的slave不是为了暴露给互联网上不可信的客户端而设计的。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 它只是一个防止实例误用的保护层。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 一个只读的slave支持所有的管理命令比如config,debug等。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 为了限制你可以用&#39;rename-command&#39;来隐藏所有的管理和危险命令来增强只读slave的安全性。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">replica-read-only</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 复制同步策略：磁盘或socket。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># -------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># WARNING: DISKLESS REPLICATION IS EXPERIMENTAL CURRENTLY</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># -------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 新的从服务和重新连接的从服务在复制的过程中将会无法接收差异数据，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 需要做完全同步，RDB文件从主服务传输到从服务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 传输有两种不同的方式：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) 磁盘备份: redis主机创建了一个新进程，该进程将RDB文件写入磁盘。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    随后，父进程将文件增量传输到副本。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) 无盘备份: redis master创建了一个新的进程，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    该进程直接将RDB文件写入从服务sockets，而根本不接触磁盘。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 使用磁盘备份复制，在生成RDB文件的同时，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 可以在当前生成子级时将更多从服务排队并与RDB文件一起提供服务。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># RDB文件完成其工作. 在无盘复制中，一旦传输开始，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 新的从服务将会排队等到当前从服务终止才会开始传输</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当使用无盘复制时, 服务器在开始传输之前等待一段可配置的时间（以秒为单位），</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 希望多个从服务能够到达，并且传输可以并行。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 使用低速磁盘和快速（大带宽）网络，无盘复制会更好。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">repl-diskless-sync</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># When diskless replication is enabled, it is possible to configure the delay the server waits in order to spawn the child that transfers the RDB via socket to the replicas.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当启用无盘复制时，可以配置服务器等待的延迟，以便生成通过socket将RDB传输到副本的子级。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这很重要，因为一旦转移开始，可能将不会为新的从服务提供服务,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 那将排队等待下一次RDB传输，因此，服务器会等待一段延迟，以便让更多的从服务到达</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 延迟以秒为单位，默认为5秒。要完全禁用它，只需将其设置为0秒，传输将尽快开始。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">repl-diskless-sync-delay</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 副本以预先定义的间隔向服务器发送ping。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 可以使用repl-ping-u replica-period选项更改此间隔。默认值为10秒。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># repl-ping-replica-period 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 以下选项设置复制超时：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) 从复制副本的角度看，同步期间的批量传输I/O。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) 从从服务的角度看主服务的超时 (data, pings)。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 3) 从主服务器的角度来看，复制超时 (REPLCONF ACK pings)。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 必须确保该值大于为repl-ping-replica-period指定的值，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 否则每次主服务器和副本之间的通信量低时都会检测到超时。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># repl-timeout 60</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 同步后在从服务socket上禁用TCP_NODELAY？</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果选择“yes”，Redis将使用较少的TCP数据包和较少的带宽向从服务发送数据。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但这可能会增加数据在从服务端出现的延迟，对于使用默认配置的Linux内核，延迟最长可达40毫秒。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果选择“no”，将减少数据出现在从服务端的延迟，但将使用更多带宽进行复制。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下，我们会针对低延迟进行优化，但在非常高的流量条件下，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 或者当主服务器和从哪个服务器距离很多跃点时，将其设置为“yes”会更好</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">repl-disable-tcp-nodelay</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 设置从服务积压量backlog大小。backlog是一个缓冲区，当从服务器断开连接一段时间后，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 它会累积从服务的数据，因此当从服务希望再次重新连接时，通常不需要完全重新同步，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 只部分重新同步就足够了，只需传递断开连接时从服务丢失的数据部分。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 从服务积压量backlog越大，从服务可断联时间可以越长，之后就可以执行部分重新同步。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 只有在至少连接了一个从服务后，才会分配积压空间backlog。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># repl-backlog-size 1mb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在主服务器一段时间内不再连接副本后，将释放backlog空间。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 以下选项配置从最后一个从服务断开连接开始，需要经过的秒数，以便释放backlog缓冲区。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意，从服务永远不会释放积压的超时时间，因为它们可能在主服务挂掉之后被提升为主服务，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 并且应该能够与从服务正确地“部分重新同步”：因此它们应该总是积累backlog。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 值为0表示永不释放backlog。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># repl-backlog-ttl 3600</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 从服务优先级是整数类型的参数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis Sentinel使用它来选择一个从服务，以便在主服务器不再正常工作时升级为主服务器</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 设置值越小优先级越高</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是，特殊优先级0将副本标记为无法执行master角色，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 因此redis sentinel将永远不会选择优先级为0的副本进行升级。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认配置为100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">replica-priority</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 100</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果连接的从服务少于n个，且延迟小于或等于m秒，则主机可以停止接受写入。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># n个副本需要处于“oneline”状态。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 延时是以秒为单位，并且必须小于等于指定值，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 是从最后一个从slave接收到的ping（通常每秒发送）开始计数。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 该选项不保证N个slave正确同步写操作，但是限制数据丢失的窗口期。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 例如至少需要3个延时小于等于10秒的从服务用下面的指令：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># min-replicas-to-write 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># min-replicas-max-lag 10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 将其中一个设置为0将禁用该功能。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认min-replicas-to-write是0，min-replicas-max-lag是10.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># redis主服务可以以不同的方式列出从服务的地址和端口。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 比如&quot;INFO replication&quot;命令就可以查看这些信息，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis Sentinel使用它和其他工具来发现副本实例。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 另一个可以获得此信息的地方是在主服务使用“role”命令查看这些信息</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 从服务通常报告的列出的IP和地址是通过以下方式获得的：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   IP: 通过检查从服务用于与主服务器连接的socket的对等地址，可以自动检测该地址。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   Port: 在复制握手期间，该端口由从服务通信，通常是在从服务用来侦听连接的端口。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是，当使用端口转发或网络地址转换（NAT）时，从服务实际上可以通过不同的IP和端口对访问。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 下面两个参数就是为了解决这个问题的，可以自行设置，从节点上报给master的自己ip和端口</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># replica-announce-ip 5.5.5.5</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># replica-announce-port 1234</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################## 安全 ###################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 要求客户端在处理任何其他命令之前发出auth&lt;password&gt;。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在您不信任其他人访问运行redis服务器的主机的环境中，这可能很有用。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 为了向后兼容，并且因为大多数人不需要身份验证（例如，他们运行自己的服务器），</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 所以应该将其注释掉。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 警告: 由于redis速度非常快，外部用户尝试破解密码速度会达到每秒多达150k次。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这意味着您应该使用一个非常强的密码，否则很容易破解。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># requirepass foobared</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 命令重命名。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在共享环境下，可以为危险命令改变名字。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 比如，你可以为 CONFIG 改个其他不太容易猜到的名字，这样内部的工具仍然可以使用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 比如:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 也可以通过将命令重命名为空字符串来完全禁用它。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># rename-command CONFIG &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 请注意：改变命令名字被记录到AOF文件或被传送到从服务器可能产生问题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################### 客户端 ####################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 同时设置最大连接客户端数。 默认情况下，此限制设置为10000个客户端，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是如果Redis服务器无法配置进程文件限制以允许指定的限制，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 则允许的最大客户端数设置为当前文件限制减去32</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#（因为Redis保留一些文件描述符供内部使用）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 达到限制后，Redis将关闭所有发送“max number of clients reached”错误的新连接。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># maxclients 10000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">############################## 内存管理 ################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 设置使用内存上限，当达到上限，Redis会尝试根据maxmemory-policy的删除策略删除keys</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果redis不能根据策略删除keys,或者如果策略设置为“noevicetion”, </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis会回复需要更多内存的错误信息给命令。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 例如，SET,LPUSH等等，但是会继续响应像Get这样的只读命令。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当将redis用作LRU或LFU缓存</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 或者为实例设置了硬性内存限制的时候（使用“noevicetion”策略）时，此选项很有用。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 警告：当有多个slave连上达到内存上限时，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 主服务为同步从服务的输出缓冲区所需内存不计算在使用内存中。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这样当移除key时，就不会因网络问题 / 重新同步事件触发移除key的循环，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 反过来从服务的输出缓冲区充满了key被移除的DEL命令，这将触发删除更多的key，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 直到这个数据库完全被清空为止。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 总之：如果您连接多个从服务，建议您为maxmemory设置一个下限，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 以便系统上有一些用于副本输出缓冲区的可用RAM（但如果策略为“noevection”，则不需要这样做）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># maxmemory &lt;bytes&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># MAXMEMORY POLICY:当达到最大内存时，Redis如何选择要删除的内容。你可以选择下面五种之一:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># volatile-lru -&gt; 根据LRU算法删除设置过期时间的key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># allkeys-lru -&gt; 根据LRU算法删除任何key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># volatile-random -&gt; 随机删除设置了过期时间的key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># allkeys-random -&gt; 随机删除任何key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># volatile-ttl -&gt; 删除即将过期的key(minor TTL)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># noeviction -&gt; 不删除任何key，只返回一个写错误信息</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># LRU means Least Recently Used</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># LFU means Least Frequently Used</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Both LRU, LFU and volatile-ttl are implemented using approximated</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># randomized algorithms.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意: 以上任何一项政策，当没有腾出足够的空间执行写命令前，redis都会报一个写错误</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#       可能受影响的命令: set setnx setex append</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#       getset mset msetnx exec sort</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认配置如下（不做删除操作）：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># maxmemory-policy noeviction</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># LRU、LFU和最小TTL算法不是精确算法，而是近似算法（为了节省内存）,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 所以你可以调整它的速度或精度。对于默认的redis将检查五个键并选择最近使用较少的键，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 您可以使用以下配置指令更改样本大小。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认值5会产生足够好的结果。10非常接近真实的LRU，但消耗更多的CPU。3速度更快，但不太准确。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># maxmemory-samples 5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 从redis 5开始，默认情况下从服务将忽略其maxmemory设置（除非在故障是Redis cluster转移</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 主从或手动将从服务升级为主服务）这意味着删除策略只有主服务处理, 只是发送del命令给从服务</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这样可以保证主从数据的一致性</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是，如果您的从服务是可写的，或者您希望从服务具有不同的内存设置，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 并且您确定对从服务执行的所有写入都是等幂的，则可以更改此默认值(但一定要明白你在做什么)。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># replica-ignore-maxmemory yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">############################# LAZY FREEING ####################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis has two primitives to delete keys. One is called DEL and is a blocking</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># deletion of the object. It means that the server stops processing new commands</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># in order to reclaim all the memory associated with an object in a synchronous</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># way. If the key deleted is associated with a small object, the time needed</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># in order to execute the DEL command is very small and comparable to most other</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># O(1) or O(log_N) commands in Redis. However if the key is associated with an</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># aggregated value containing millions of elements, the server can block for</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># a long time (even seconds) in order to complete the operation.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># For the above reasons Redis also offers non blocking deletion primitives</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># such as UNLINK (non blocking DEL) and the ASYNC option of FLUSHALL and</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># FLUSHDB commands, in order to reclaim memory in background. Those commands</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># are executed in constant time. Another thread will incrementally free the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># object in the background as fast as possible.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># DEL, UNLINK and ASYNC option of FLUSHALL and FLUSHDB are user-controlled.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># It&#39;s up to the design of the application to understand when it is a good</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># idea to use one or the other. However the Redis server sometimes has to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># delete keys or flush the whole database as a side effect of other operations.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Specifically Redis deletes objects independently of a user call in the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># following scenarios:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1) On eviction, because of the maxmemory and maxmemory policy configurations,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    in order to make room for new data, without going over the specified</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    memory limit.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2) Because of expire: when a key with an associated time to live (see the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    EXPIRE command) must be deleted from memory.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 3) Because of a side effect of a command that stores data on a key that may</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    already exist. For example the RENAME command may delete the old key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    content when it is replaced with another one. Similarly SUNIONSTORE</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    or SORT with STORE option may delete existing keys. The SET command</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    itself removes any old content of the specified key in order to replace</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    it with the specified string.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 4) During replication, when a replica performs a full resynchronization with</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    its master, the content of the whole database is removed in order to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    load the RDB file just transferred.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># In all the above cases the default is to delete objects in a blocking way,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># like if DEL was called. However you can configure each case specifically</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># in order to instead release memory in a non-blocking way like if UNLINK</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># was called, using the following configuration directives:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">lazyfree-lazy-eviction</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">lazyfree-lazy-expire</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">lazyfree-lazy-server-del</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">replica-lazy-flush</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">############################## APPEND ONLY MODE ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下，redis异步转储磁盘上的数据集。在许多应用程序中，这种模式已经足够好了，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是Redis进程的问题或断电可能会导致几分钟的写入丢失（取决于配置的保存点）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># AOF是另一种持久性模式，可提供更好的耐久性。例如，如果使用RDB策略,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis挂掉（如服务器断电）时只会丢失一秒钟的写入时间</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># AOF和RDB持久性可以同时启用，不会出现问题。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis会优先使用AOF策略，因为更好地保证了数据持久化</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 请访问 http://redis.io/topics/persistence 获取更多信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">appendonly</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># AOF文件名（默认：&quot;appendonly.aof&quot;）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">appendfilename</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;appendonly.aof&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># fsync() 系统调用告诉操作系统把数据写到磁盘上，而不是等更多的数据进入输出缓冲区。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 有些操作系统会真的把数据马上刷到磁盘上；有些则会尽快去尝试这么做。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis支持三种不同的模式：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># no：不要立刻刷，只有在操作系统需要刷的时候再刷。比较快。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># always：每次写操作都立刻写入到aof文件。慢，但是最安全。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># everysec：每秒写一次。折中方案。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认的 &quot;everysec&quot; 通常来说能在速度和数据安全性之间取得比较好的平衡。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 更多细节信息访问下面链接：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># http://antirez.com/post/redis-persistence-demystified.html</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果不确定就使用everysec</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># appendfsync always</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">appendfsync</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> everysec</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># appendfsync no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当AOF同步策略设置为always或everysec时，后台保存进程(后台保存或写入AOF日志)正在对</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 磁盘执行大量I/O，在某些Linux配置中，redis可能会在fsync（）调用上阻塞太长时间。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注意，目前对这个情况还没有完美修正，甚至不同线程的 fsync() 会阻塞我们同步的write(2)调用。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 为了缓解这个问题，可以用下面这个选项。它可以在 BGSAVE 或 BGREWRITEAOF</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 处理时阻止fsync()。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这意味着当另一个子进程在保存时, 那么Redis就处于&quot;不可同步&quot;的状态。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这实际上是说，在最差的情况下可能会丢掉30秒钟的日志数据。（默认Linux设定）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果把这个设置成&quot;yes&quot;带来了延迟问题，就保持&quot;no&quot;，这是保存持久数据的最安全的方式。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">no-appendfsync-on-rewrite</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 自动重写AOF文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当AOF日志大小增加指定的百分比时，Redis能够调用BGREWRITEAOF自动重写AOF的日志文件。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 工作原理:Redis记住上次重写AOF文件的大小(如果重启后还没有写操作，就直接用启动时的AOF大小)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这个基准大小和当前大小做比较。如果当前大小超过指定比例，就会触发重写操作。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 你还需要指定被重写日志的最小尺寸，这样避免了达到指定百分比但尺寸仍然很小的情况还要重写。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 指定百分比为0会禁用AOF自动重写特性</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">auto-aof-rewrite-percentage</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 100</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">auto-aof-rewrite-min-size</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 64mb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果设置为yes，如果一个因异常被截断的AOF文件被redis启动时加载进内存，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># redis将会发送日志通知用户。如果设置为no，erdis将会拒绝启动。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 此时需要用&quot;redis-check-aof&quot;工具修复文件。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">aof-load-truncated</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在重写AOF文件时，Redis可以使用AOF文件中的RDB前导码来更快地重写和恢复。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启用此选项时，重写的AOF文件由两个不同的参数组成。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   [RDB file][AOF tail]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当加载redis时，识别出AOF文件以“redis”字符串开头并加载前缀RDB文件，然后继续加载AOF尾部。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">aof-use-rdb-preamble</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################ LUA 脚本  ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Lua脚本的最大执行时间（毫秒）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">lua-time-limit</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################ REDIS 集群  ###############################</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果想让Redis实例作为集群的一部分，需要去掉下方配置的注释</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-enabled yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 配置redis自动生成的集群配置文件名。确保同一系统中运行的各redis实例该配置文件不要重名。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-config-file nodes-6379.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 集群节点超时毫秒数。超时的节点将被视为不可用状态。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-node-timeout 15000</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果发生故障的主机从服务的数据太旧了，这个从服务会避免升级为主服务，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果主从失联时间超过：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   (node-timeout * replica-validity-factor) + repl-ping-replica-period</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 则不会被提升为master</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如node-timeout为30秒，slave-validity-factor为10,slave-validity-factor为10,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认default repl-ping-slave-period为10秒,失联时间超过310秒slave就不会成为master。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 较大的slave-validity-factor值可能允许包含过旧数据的从服务器成为主服务器，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 同时较小的值可能会阻止集群选举出新主服务。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 为了达到最大限度的高可用性，可以设置为0，即从服务不管和主服务失联多久都可以提升为主服务</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-replica-validity-factor 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 只有在之前master有其它指定数量的工作状态下的slave节点时，slave节点才能提升为master。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认为1（即该集群至少有3个节点，1 master＋2 slaves，master宕机，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 仍有另外1个slave的情况下其中1个slave可以提升）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 测试环境可设置为0，生成环境中至少设置为1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-migration-barrier 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下如果redis集群如果检测到至少有1个hash slot不可用，集群将停止查询数据。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果所有slot恢复则集群自动恢复。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果需要集群部分可用情况下仍可提供查询服务，设置为no。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-require-full-coverage yes</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 选项设置为yes时，会阻止replicas尝试对其主服务在主故障期间进行故障转移</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 然而，主服务仍然可以执行手动故障转移,如果强制这样做的话。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-replica-no-failover no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># In order to setup your cluster make sure to read the documentation</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># available at http://redis.io web site.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">########################## CLUSTER DOCKER/NAT support  ########################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># In certain deployments, Redis Cluster nodes address discovery fails, because</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># addresses are NAT-ted or because ports are forwarded (the typical case is</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Docker and other containers).</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># In order to make Redis Cluster working in such environments, a static</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># configuration where each node knows its public address is needed. The</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># following two options are used for this scope, and are:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># * cluster-announce-ip</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># * cluster-announce-port</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># * cluster-announce-bus-port</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Each instruct the node about its address, client port, and cluster message</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># bus port. The information is then published in the header of the bus packets</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># so that other nodes will be able to correctly map the address of the node</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># publishing the information.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># If the above options are not used, the normal Redis Cluster auto-detection</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># will be used instead.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Note that when remapped, the bus port may not be at the fixed offset of</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># clients port + 10000, so you can specify any port and bus-port depending</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># on how they get remapped. If the bus-port is not set, a fixed offset of</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 10000 will be used as usually.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Example:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-announce-ip 10.1.1.5</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-announce-port 6379</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># cluster-announce-bus-port 6380</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################## 慢日志 ###################################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 慢查询日志，记录超过多少微秒的查询命令。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 查询的执行时间不包括客户端的IO执行和网络通信时间，只是查询命令执行时间。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1000000等于1秒，设置为0则记录所有命令</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">slowlog-log-slower-than</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 记录大小，可通过SLOWLOG RESET命令重置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">slowlog-max-len</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 128</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">################################ 延时监控 ##############################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># redis延时监控系统在运行时会采样一些操作，以便收集可能导致延时的数据根源。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 通过 LATENCY命令 可以打印一些图样和获取一些报告，方便监控</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这个系统仅仅记录那个执行时间大于或等于预定时间（毫秒）的操作,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这个预定时间是通过latency-monitor-threshold配置来指定的，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当设置为0时，这个监控系统处于停止状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">latency-monitor-threshold</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">############################# 事件通知 ##############################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># K 	键空间通知，所有通知以 __keyspace@&lt;db&gt;__ 为前缀</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># E 	键事件通知，所有通知以 __keyevent@&lt;db&gt;__ 为前缀</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># g 	DEL 、 EXPIRE 、 RENAME 等类型无关的通用命令的通知</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># $ 	字符串命令的通知</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># l 	列表命令的通知</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># s 	集合命令的通知</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># h 	哈希命令的通知</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># z 	有序集合命令的通知</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># x 	过期事件：每当有过期键被删除时发送</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># e 	驱逐(evict)事件：每当有键因为 maxmemory 政策而被删除时发送</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># A 	参数 g$lshzxe 的别名</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#  Example: to enable list and generic events, from the point of view of the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#           event name, use:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#  notify-keyspace-events Elg</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#  Example 2: to get the stream of the expired keys subscribing to channel</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#             name __keyevent@0__:expired use:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#  notify-keyspace-events Ex</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis能通知 Pub/Sub 客户端关于键空间发生的事件，默认关闭</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">notify-keyspace-events</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">############################### 高级配置 ###############################</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当hash只有少量的entry时，并且最大的entry所占空间没有超过指定的限制时，会用一种节省内存的</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 数据结构来编码。可以通过下面的指令来设定限制</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">hash-max-ziplist-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">hash-max-ziplist-value</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 64</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这时，它只能取-1到-5</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这五个值，每个值含义如下：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    -5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb =&gt; 1024 bytes）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    -4: 每个quicklist节点上的ziplist大小不能超过32 Kb。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    -3: 每个quicklist节点上的ziplist大小不能超过16 Kb。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    -2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    -1: 每个quicklist节点上的ziplist大小不能超过4 Kb。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">list-max-ziplist-size</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这个参数表示一个quicklist两端不被压缩的节点个数。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 注：这里的节点个数是指quicklist双向链表的节点个数，而不是指ziplist里面的数据项个数。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 实际上，一个quicklist节点上的ziplist，如果被压缩，就是整体被压缩的。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 参数list-compress-depth的取值含义如下：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    0: 是个特殊值，表示都不压缩。这是Redis的默认值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#    依此类推…</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 由于0是个特殊值，很容易看出quicklist的头节点和尾节点总是不被压缩的，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 以便于在表的两端进行快速存取。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">list-compress-depth</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># set有一种特殊编码的情况：当set数据全是十进制64位有符号整型数字构成的字符串时。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 下面这个配置项就是用来设置set使用这种编码来节省内存的最大长度。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">set-max-intset-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 512</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 与hash和list相似，有序集合也可以用一种特别的编码方式来节省大量空间。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这种编码只适合长度和元素都小于下面限制的有序集合</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">zset-max-ziplist-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 128</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">zset-max-ziplist-value</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 64</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># HyperLogLog稀疏结构表示字节的限制。该限制包括</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 16个字节的头。当HyperLogLog使用稀疏结构表示</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这些限制，它会被转换成密度表示。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 值大于16000是完全没用的，因为在该点</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 密集的表示是更多的内存效率。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 建议值是3000左右，以便具有的内存好处, 减少内存的消耗</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">hll-sparse-max-bytes</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 3000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Streams宏节点最大大小/项目。 流数据结构是基数编码内部多个项目的大节点树。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 使用此配置可以配置单个节点的字节数，以及切换到新节点之前可能包含的最大项目数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 追加新的流条目。 如果以下任何设置设置为0，忽略限制，因此例如可以设置一个</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 大入口限制将max-bytes设置为0，将max-entries设置为所需的值</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">stream-node-max-bytes</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 4096</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">stream-node-max-entries</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 100</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启用哈希刷新，每100个CPU毫秒会拿出1个毫秒来刷新Redis的主哈希表（顶级键值映射表）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">activerehashing</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 客户端的输出缓冲区的限制，可用于强制断开那些因为某种原因从服务器</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 读取数据的速度不够快的客户端</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">client-output-buffer-limit</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> normal</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">client-output-buffer-limit</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> replica</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 256mb</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 64mb</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 60</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">client-output-buffer-limit</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> pubsub</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 32mb</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 8mb</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 60</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 客户端查询缓冲区累积新命令。 它们仅限于固定的默认情况下，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 多数情况下为了避免协议不同步导致客户端查询缓冲区中未绑定的内存使用量的错误</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是，如果你有使用的话，你可以在这里配置它，比如我们有很多执行请求或类似的。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># client-query-buffer-limit 1gb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在Redis协议中，批量请求，即表示单个的元素strings，通常限制为512 MB。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 但是，您可以z更改此限制</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># proto-max-bulk-len 512mb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 默认情况下，“hz”的被设定为10。提高该值将在Redis空闲时使用更多的CPU时，但同时当有多个key</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 同时到期会使Redis的反应更灵敏，以及超时可以更精确地处理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">hz</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Normally it is useful to have an HZ value which is proportional to the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># number of clients connected. This is useful in order, for instance, to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># avoid too many clients are processed for each background task invocation</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># in order to avoid latency spikes.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Since the default HZ value by default is conservatively set to 10, Redis</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># offers, and enables by default, the ability to use an adaptive HZ value</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># which will temporary raise when there are many connected clients.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># When dynamic HZ is enabled, the actual configured HZ will be used as</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># as a baseline, but multiples of the configured HZ value will be actually</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># used as needed once more clients are connected. In this way an idle</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># instance will use very little CPU time while a busy instance will be</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># more responsive.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">dynamic-hz</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当一个子进程重写AOF文件时，如果启用下面的选项，则文件每生成32M数据会被同步</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">aof-rewrite-incremental-fsync</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 当redis保存RDB文件时，如果启用了以下选项，每生成32 MB数据，文件将被fsync-ed。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 这很有用，以便以递增方式将文件提交到磁盘并避免大延迟峰值。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">rdb-save-incremental-fsync</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># Redis LFU eviction (see maxmemory setting) can be tuned. However it is a good</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># idea to start with the default settings and only change them after investigating</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># how to improve the performances and how the keys LFU change over time, which</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># is possible to inspect via the OBJECT FREQ command.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># There are two tunable parameters in the Redis LFU implementation: the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># counter logarithm factor and the counter decay time. It is important to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># understand what the two parameters mean before changing them.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># The LFU counter is just 8 bits per key, it&#39;s maximum value is 255, so Redis</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># uses a probabilistic increment with logarithmic behavior. Given the value</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># of the old counter, when a key is accessed, the counter is incremented in</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># this way:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 1. A random number R between 0 and 1 is extracted.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 2. A probability P is calculated as 1/(old_value*lfu_log_factor+1).</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 3. The counter is incremented only if R &lt; P.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># The default lfu-log-factor is 10. This is a table of how the frequency</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># counter changes with a different number of accesses with different</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># logarithmic factors:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># | factor | 100 hits   | 1000 hits  | 100K hits  | 1M hits    | 10M hits   |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># | 0      | 104        | 255        | 255        | 255        | 255        |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># | 1      | 18         | 49         | 255        | 255        | 255        |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># | 10     | 10         | 18         | 142        | 255        | 255        |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># | 100    | 8          | 11         | 49         | 143        | 255        |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># +--------+------------+------------+------------+------------+------------+</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># NOTE: The above table was obtained by running the following commands:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   redis-benchmark -n 1000000 incr foo</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#   redis-cli object freq foo</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># NOTE 2: The counter initial value is 5 in order to give new objects a chance</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># to accumulate hits.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># The counter decay time is the time, in minutes, that must elapse in order</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># for the key counter to be divided by two (or decremented if it has a value</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># less &lt;= 10).</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># The default value for the lfu-decay-time is 1. A Special value of 0 means to</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># decay the counter every time it happens to be scanned.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># lfu-log-factor 10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># lfu-decay-time 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">########################### ACTIVE DEFRAGMENTATION #######################</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启用主动碎片整理</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># activedefrag yes</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启动活动碎片整理的最小碎片浪费量</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># active-defrag-ignore-bytes 100mb</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 启动碎片整理的最小碎片百分比</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># active-defrag-threshold-lower 10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 使用最大消耗时的最大碎片百分比</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># active-defrag-threshold-upper 100</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 在CPU百分比中进行碎片整理的最小消耗</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># active-defrag-cycle-min 5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 磁盘碎片整理的最大消耗</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># active-defrag-cycle-max 75</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 将从主字典扫描处理的最大set / hash / zset / list字段数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># active-defrag-max-scan-fields 1000</span></span></code></pre></div></details>`,3);function u(s,C,f,b,v,R){const p=h,e=t("ClientOnly");return l(),r("div",null,[F,c(e,null,{default:d(()=>{var a,i;return[(((a=s.$frontmatter)==null?void 0:a.aside)??!0)&&(((i=s.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(l(),D(p,{key:0,article:s.$frontmatter},null,8,["article"])):A("",!0)]}),_:1}),m])}const L=k(o,[["render",u]]);export{E as __pageData,L as default};
