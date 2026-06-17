!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID_AQUI'); /* ← REEMPLAZÁ ESTE ID */
fbq('track', 'PageView');
fbq('track', 'ViewContent', {
  content_name: 'Sistema IA del Agente',
  content_category: 'Infoproducto Inmobiliario',
  value: 17.00,
  currency: 'USD'
});
