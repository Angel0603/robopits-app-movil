// TerminosCondiciones.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import Textito from '../components/Textito';

const TerminosCondiciones = () => {
  const terms = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al acceder y utilizar la plataforma de Robopits, usted acepta estar sujeto a estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos, debe abstenerse de utilizar el sitio web y sus servicios asociados."
    },
    {
      title: "2. Cambios y Modificaciones",
      content: "Robopits se reserva el derecho de cambiar o modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. Es responsabilidad del usuario revisar regularmente estos términos."
    },
    {
      title: "3. Cuentas de Usuario",
      content: "Para acceder a ciertas funciones del sitio web, puede ser necesario crear una cuenta. Usted es responsable de mantener la confidencialidad de su contraseña y cuenta, y es completamente responsable de todas las actividades que ocurran bajo su cuenta."
    },
    {
      title: "4. Uso Permitido",
      content: "Se le concede un derecho limitado, no exclusivo e intransferible para acceder y utilizar el sitio web y su contenido para fines personales y no comerciales, sujeto a estos términos."
    },
    {
      title: "5. Propiedad Intelectual",
      content: "Todo el contenido incluido en el sitio, como textos, gráficos, logos, imágenes, así como la compilación de dicho contenido, es propiedad de Robopits o sus proveedores de contenido y está protegido por las leyes de derechos de autor y marcas registradas."
    },
    {
      title: "6. Prohibiciones de Uso",
      content: "Usted acuerda no utilizar el sitio web para propósitos ilegales, no cargar, transmitir o distribuir cualquier material que sea de carácter difamatorio, obsceno, invasivo de la privacidad de terceros, abusivo, ilegal o de cualquier manera objetable."
    },
    {
      title: "7. Política de Privacidad",
      content: "Por favor, consulte nuestra Política de Privacidad que explica cómo recopilamos, usamos y protegemos la información personal de los usuarios de nuestro sitio."
    },
    {
      title: "8. Terminación",
      content: "Robopits puede terminar su acceso al sitio web sin causa o aviso, lo que puede resultar en la destrucción y la pérdida de toda información asociada con su cuenta."
    },
    {
      title: "9. Enlaces a Terceros",
      content: "Este sitio puede contener enlaces a sitios web operados por terceros. Estos enlaces se proporcionan para su conveniencia, y Robopits no tiene control sobre estos sitios y no es responsable de su contenido."
    },
    {
      title: "10. Limitación de Responsabilidad",
      content: "Robopits no será responsable por cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la incapacidad de usar el sitio web."
    },
    {
      title: "11. Indemnización",
      content: "Usted acuerda indemnizar y eximir a Robopits, sus oficiales, directores, empleados y agentes, de cualquier demanda o demanda, incluyendo honorarios razonables de abogados, hechos por cualquier tercero debido a su uso del sitio web."
    },
    {
      title: "12. Ley Aplicable",
      content: "Estos términos y condiciones serán regidos e interpretados de acuerdo con las leyes del país de operación de Robopits, sin dar efecto a ningún principio de conflictos de ley."
    },
    {
      title: "13. Disputas",
      content: "Cualquier disputa relacionada de alguna manera con su visita a Robopits o a productos que usted compra a través de Robopits será sometida a arbitraje confidencial en el país de operación de Robopits, excepto que, en la medida en que haya violado o amenazado con violar los derechos de propiedad intelectual de Robopits, Robopits puede buscar una medida cautelar u otro alivio apropiado en cualquier tribunal estatal o federal y usted consiente a la jurisdicción exclusiva y al lugar en tales tribunales."
    },
    {
      title: "14. Modificaciones al Servicio y Precios",
      content: "Los precios de nuestros productos están sujetos a cambio sin aviso. Robopits se reserva el derecho de modificar o discontinuar el Servicio (o cualquier parte del contenido) sin aviso en cualquier momento."
    },
    {
      title: "15. Errores, Inexactitudes y Omisiones",
      content: "De vez en cuando, puede haber información en nuestro sitio o en el Servicio que contenga errores tipográficos, inexactitudes u omisiones que puedan relacionarse con descripciones de productos, precios, promociones, ofertas y disponibilidad. Robopits se reserva el derecho de corregir cualquier error, inexactitud u omisión, y de cambiar o actualizar información o cancelar pedidos si alguna información en el Servicio o en cualquier sitio web relacionado es inexacta en cualquier momento sin previo aviso."
    }
  ];

  return (
    <ScrollView className="flex-1 bg-[#fffee7] p-4">
      <Textito className="text-3xl font-bold text-[#d19100] text-center my-6">Términos y Condiciones</Textito>
      {terms.map((item, index) => (
        <View key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
          <Textito className="text-2xl text-[#d19100] mb-2" fontFamily="PoppinsBold">{item.title}</Textito>
          <Textito className="text-base text-gray-700">{item.content}</Textito>
        </View>
      ))}
      <View className="mb-12 bg-white p-4 rounded-lg shadow flex-col">
        <Textito className="text-2xl text-[#d19100]" fontFamily="PoppinsBold">Última actualización:</Textito>
        <Textito className="text-2xl text-gray-700" fontFamily="PoppinsBold">07 Agosto de 2024</Textito>
      </View>
    </ScrollView>
  );
};

export default TerminosCondiciones;
