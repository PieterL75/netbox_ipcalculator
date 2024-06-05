function cidrcalc() {
    this.ipver=0;		//ipversion (valid range: 1,4)
    this.ip='';  		//ip
    this.pl=-1;  		//prefixlength
    this.sm='';  		//subnetmask
    this.wc='';  		//wildcard (=!sm)
    this.nw='';  		//gateway
    this.br='';  		//broadcast
    this.ht='';  		//ht
    this.gw='';  		//gateway
    this.firstip=''; 	//first usable host ip
    this.lastip='';  	//last usable host ip
    this.maxips=0; 		//nbr of ips in subnet
    this.maxhosts=0; 	//max usable ip's for hosts
    this.rfc1918=false;	//private address ?
    this.iptype='';		//Type of address
    this.class='';		//ipv4 class A,B,C; ipv6 known prefix
    var mpl=0;  		//maxprefixlength

    
    
    this.setip=function(ip) {
        this.ip=this.inet_ntop(this.inet_pton(ip));
        return this.calccidr();
    }

    this.setpl=function(pl) {
        this.pl=pl;
        return this.calccidr();
    }

    this.setsm=function(sm) {
        var inet_sm;
        this.sm=sm;
        this.pl=0;
        inet_sm=this.inet_pton(this.sm);
        var i=0;
        var bit=1;
/*		while ((i<inet_sm.length) && (bit==1)) {
            bit
        }*/
        return this.calccidr();
    }

    this.setcidr=function(newcidr) {
        var m;
        m = newcidr.match(/^[0-9a-fA-F\:\.]+\/[\d\.]+$/); //at least match 'something/number'
        if (m) { 
            m=m[0].split('/');
            this.ip=m[0];
            if (m[1].match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}?(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
                this.pl=this.netmask2cidr(m[1]) 
            } else {
                this.pl=parseInt(m[1]);
            }
            return this.calccidr();
        }
        return false;
    }

    this.calccidr=function() {
        // ipver, ip and pl must be known.
        var inet_ip, inet_sm, inet_wc, inet_nw, inet_br, inet_ht;
        if (this.validcidr()) {
            inet_ip=this.inet_pton(this.ip);
            inet_sm='';
            inet_wc='';
            inet_nw='';
            inet_br='';
            inet_ht='';
            
            this.firstip='';
            this.lastip='';
            this.iptype='';
            this.maxips=1;
            
            var smd=0;  			//subnetmask digit
            var ones=(this.pl>>3);	//how many blocks of 8 bits are ones...
            var ipd='';				//ip digit
            for(var i=0;i<inet_ip.length;i++) {
                if (i<ones) smd=0xFF;
                if (i==ones) smd=(0xFF << (8-(this.pl & 7))) & 0xFF;
                if (i>ones) smd=0x00;
                ipd=inet_ip.charCodeAt(i);
                inet_sm+=String.fromCharCode(smd);
                inet_wc+=String.fromCharCode(0xFF - smd);
                inet_nw+=String.fromCharCode(ipd & smd);
                inet_br+=String.fromCharCode((0xFF - smd) + (ipd & smd));
                inet_ht+=String.fromCharCode(ipd & (0xFF - smd));
                this.maxips*=0x100 - smd;
            }
            if (this.pl<mpl-1) {
                this.firstip=this.inet_ntop(inet_nw.substr(0,inet_nw.length-1) + String.fromCharCode(inet_nw.charCodeAt(inet_nw.length-1) + 1));
                this.lastip=this.inet_ntop(inet_br.substr(0,inet_br.length-1) + String.fromCharCode(inet_br.charCodeAt(inet_br.length-1) - 1));
            }
            this.sm=this.inet_ntop(inet_sm);
            this.wc=this.inet_ntop(inet_wc);
            this.nw=this.inet_ntop(inet_nw);
            this.br=this.inet_ntop(inet_br);
            this.ht=this.inet_ntop(inet_ht);
            this.gw=this.firstip;
            this.maxhosts=this.maxips>2?this.maxips-2:0;
            this.rfc1918=(this.ipver==4)&&inet_nw.match(/^(\x0A)|(\xAC(\x10|\x11|\x12|\x13|\x14|\x15|\x16|\x17|\x18|\x19|\x1A|\x1B|\x1C|\x1D|\x1E|\x1F))|(\xC0\xA8)/);
            if (this.ipver==4) {
                this.iptype='Global Unicast';
                if (inet_ip.match(/^\x7F\x00\x00\x01$/) && (this.pl==32)) this.iptype='Loopback';
                if (inet_ip.match(/^\x0A/) && (this.pl>7)) this.iptype='Private Class A';
                if (inet_ip.match(/^(\xAC(\x10|\x11|\x12|\x13|\x14|\x15|\x16|\x17|\x18|\x19|\x1A|\x1B|\x1C|\x1D|\x1E|\x1F))/) && (this.pl>11)) this.iptype='Private Class B';
                if (inet_ip.match(/^\xC0\xA8/) && (this.pl>15)) this.iptype='Private Class C';
                if (inet_ip.match(/^\xA9\xFE/) && (this.pl>15)) this.iptype='Link-local';
                if (inet_ip.match(/^\xC0\x00\x00/) && (this.pl>23)) this.iptype='Reserved (IANA)';
                if (inet_ip.match(/^\xC0\x00\x02/) && (this.pl>23)) this.iptype='TEST-NET-1, documentation and examples';
                if (inet_ip.match(/^\xC0\x58\x63/) && (this.pl>23)) this.iptype='IPv6 to IPv4 relay';
                if (inet_ip.match(/^\xE0/) && (this.pl>3)) this.iptype='Multicast';
                if (inet_ip.match(/^\xF0/) && (this.pl>3)) this.iptype='Reserved';
            }
            if (this.ipver==6) {
                this.iptype='Global Unicast';
                if ((inet_ip=='\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00') && (this.pl==128)) this.iptype='Unspecified';
                if ((inet_ip=='\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01') && (this.pl==128)) this.iptype='Loopback';
                if (inet_ip.match(/^\xFF/) && (this.pl>7)) this.iptype='Multicast';
                if (inet_ip.match(/^\xFE(\x80|\x81|\x82|\x83|\x84|\x85|\x86|\x87|\x88|\x89|\x8A|\x8B|\x8C|\x8D|\x8E|\x8F)/) && (this.pl>9)) this.iptype='Link-Local unicast';
            }
            return true;
            
        }
        return false;
    }
    
    this.validcidr=function() {
        var a, ipver4, ipver6;
        this.ipver=0;
        mpl=0;
        a=this.ip;
        ipver4 = a.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}?(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
        ipver6 = a.match(/^(::|(([a-fA-F0-9]{1,4}):){7}(([a-fA-F0-9]{1,4}))|(:(:([a-fA-F0-9]{1,4})){1,6})|((([a-fA-F0-9]{1,4}):){1,6}:)|((([a-fA-F0-9]{1,4}):)(:([a-fA-F0-9]{1,4})){1,6})|((([a-fA-F0-9]{1,4}):){2}(:([a-fA-F0-9]{1,4})){1,5})|((([a-fA-F0-9]{1,4}):){3}(:([a-fA-F0-9]{1,4})){1,4})|((([a-fA-F0-9]{1,4}):){4}(:([a-fA-F0-9]{1,4})){1,3})|((([a-fA-F0-9]{1,4}):){5}(:([a-fA-F0-9]{1,4})){1,2}))$/);
        a=this.inet_ntop(this.inet_pton(this.ip));
        if (a==false) return false;  //invalid ip format

        if (ipver4) {
            this.ipver=4;
            mpl=32;
        }
        if (ipver6) {
            this.ipver=6;
            mpl=128;
        }
        if ((this.ipver>0) && (this.pl>=0) && (this.pl<=mpl)) {
            return true;
        }

        this.ipver=0; //wrong pl or ip, reset version to 0
        return false;
    }
    
    this.inet_pton = function(a) {
        // http://kevin.vanzonneveld.net
        // +   original by: Theriault
        // *     example 1: inet_pton('::');
        // *     returns 1: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0' (binary)
        // *     example 2: inet_pton('127.0.0.1');
        // *     returns 2: '\x7F\x00\x00\x01' (binary)
        var r, m, x, i, j, f = String.fromCharCode;
        m = a.match(/^(?:\d{1,3}(?:\.|$)){4}/); // IPv4
        if (m) {
            m = m[0].split('.');
            m = f(m[0]) + f(m[1]) + f(m[2]) + f(m[3]);
            // Return if 4 bytes, otherwise false.
            return m.length === 4 ? m : false;
        }
        r = /^((?:[\da-f]{1,4}(?::|)){0,8})(::)?((?:[\da-f]{1,4}(?::|)){0,8})$/;
        m = a.match(r); // IPv6
        if (m) {
            // Translate each hexadecimal value.
            for (j = 1; j < 4; j++) {
                // Indice 2 is :: and if no length, continue.
                if (j === 2 || m[j].length === 0) {
                    continue;
                }
                m[j] = m[j].split(':');
                for (i = 0; i < m[j].length; i++) {
                    m[j][i] = parseInt(m[j][i], 16);
                    // Would be NaN if it was blank, return false.
                    if (isNaN(m[j][i])) {
                        return false; // Invalid IP.
                    }
                    m[j][i] = f(m[j][i] >> 8) + f(m[j][i] & 0xFF);
                }
                m[j] = m[j].join('');
            }
            x = m[1].length + m[3].length;
            if (x === 16) {
                return m[1] + m[3];
            } else if (x < 16 && m[2].length > 0) {
                return m[1] + (new Array(16 - x + 1)).join('\x00') + m[3];
            }
        }
        return false; // Invalid IP.
    }

    this.inet_ntop = function(a) {
        // http://kevin.vanzonneveld.net
        // +   original by: Theriault
        // *     example 1: inet_ntop('\x7F\x00\x00\x01');
        // *     returns 1: '127.0.0.1'
        // *     example 2: inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1');
        // *     returns 2: '::1'
        var i = 0,
        m = '',
        c = [];
        a += '';
        if (a.length === 4) { // IPv4
            return [
            a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2), a.charCodeAt(3)].join('.');
        } else if (a.length === 16) { // IPv6
            for (i = 0; i < 16; i++) {
                c.push(((a.charCodeAt(i++) << 8) + a.charCodeAt(i)).toString(16));
            }
            return c.join(':').replace(/((^|:)0(?=:|$))+:?/g, function (t) {
                m = (t.length > m.length) ? t : m;
                return t;
            }).replace(m || ' ', '::');
        } else { // Invalid length
            return false;
        }
    }

    this.netmask2cidr = function(nm) {
        var m = nm.match(/^(?:\d{1,3}(?:\.|$)){4}/); // IPv4
        if (m) {
            nmcidr = 0
            m = m[0].split('.');
            for (i = 0; i < m.length; i++) {
                nmcidr += parseInt(m[i]).toString(2).replace(/0/g,"").length
            }                    
            return nmcidr
        }
    }
}
