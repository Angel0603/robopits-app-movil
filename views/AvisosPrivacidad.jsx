// AvisosPrivacidad.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import Textito from '../components/Textito';

const AvisosPrivacidad = () => {
  const privacyPolicies = [
    {
      title: "1. Recopilación de Datos",
      content: "Recopilamos información personal solo cuando es estrictamente necesario para la funcionalidad de nuestros servicios. Esto incluye, pero no se limita a, nombre, dirección de correo electrónico y dirección física."
    },
    {
      title: "2. Uso de la Información",
      content: "La información recopilada se utiliza exclusivamente para procesar transacciones, mejorar la experiencia del usuario y comunicar novedades o cambios en nuestros servicios."
    },
    {
      title: "3. Consentimiento del Usuario",
      content: "Al crear una cuenta, los usuarios deben consentir expresamente el uso de su información personal de acuerdo con estas políticas."
    },
    {
      title: "4. Protección de Datos",
      content: "Implementamos medidas de seguridad estándar y avanzadas para proteger los datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción."
    },
    {
      title: "5. Autenticación con JWT",
      content: "Utilizamos JSON Web Token para manejar la autenticación y la sesión de los usuarios. Los JWT son generados de manera segura y almacenados de forma segura en el lado del cliente."
    },
    {
      title: "6. Encriptación",
      content: "Toda la información sensible, incluidas las contraseñas y los datos de pago, se encripta utilizando tecnología de cifrado de última generación antes de su almacenamiento y transmisión."
    },
    {
      title: "7. Control de Acceso",
      content: "El acceso a información sensible está estrictamente limitado a empleados autorizados que necesitan conocer esa información para procesarla en nuestro nombre."
    },
    {
      title: "8. Revisión de Seguridad",
      content: "Realizamos revisiones periódicas de seguridad y actualizaciones de nuestro sistema para garantizar que todas las medidas de seguridad están actualizadas y son efectivas."
    },
    {
      title: "9. Protección contra CSRF y XSS",
      content: "Implementamos medidas para proteger contra ataques de Cross-Site Request Forgery (CSRF) y Cross-Site Scripting (XSS) para asegurar la integridad de las sesiones de nuestros usuarios y la seguridad de nuestros datos."
    },
    {
      title: "10. Política de Cookies",
      content: "Usamos cookies para mejorar la experiencia del usuario y analizar el tráfico del sitio. Nuestra política de cookies se explica detalladamente y es accesible para todos los usuarios."
    },
    {
      title: "11. Transparencia en el Procesamiento",
      content: "Informamos a los usuarios sobre cómo y por qué procesamos sus datos. Esta información está disponible de forma clara y accesible."
    },
    {
      title: "12. Derechos de los Usuarios",
      content: "Los usuarios pueden acceder, corregir o solicitar la eliminación de su información personal en cualquier momento."
    },
    {
      title: "13. Notificación de Brechas de Seguridad",
      content: "En caso de una brecha de seguridad, notificaremos a los usuarios afectados y a las autoridades pertinentes conforme a la ley aplicable dentro de las 72 horas."
    },
    {
      title: "14. Retención de Datos",
      content: "Retenemos información personal solo durante el tiempo necesario para cumplir con los propósitos para los cuales se recopiló."
    },
    {
      title: "15. Terceros y Compartir Datos",
      content: "No compartimos información personal con terceros, excepto cuando es necesario para proporcionar servicios a los usuarios o cumplir con la ley."
    },
    {
      title: "16. Responsabilidad de Datos",
      content: "Somos responsables de mantener la integridad y seguridad de los datos personales que recopilamos."
    },
    {
      title: "17. Auditorías de Seguridad",
      content: "Realizamos auditorías de seguridad regulares para evaluar y mejorar nuestras prácticas de seguridad."
    },
    {
      title: "18. Formación en Seguridad",
      content: "Ofrecemos formación periódica sobre seguridad de la información a todos los empleados para asegurar que estén informados sobre las mejores prácticas y procedimientos."
    },
    {
      title: "19. Cumplimiento Legal",
      content: "Nos aseguramos de que todas nuestras prácticas de recopilación y procesamiento de datos cumplan con las leyes y regulaciones de privacidad aplicables."
    },
    {
      title: "20. Modificaciones a las Políticas de Privacidad",
      content: "Nos reservamos el derecho de modificar estas políticas en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web."
    }
  ];

  return (
    <ScrollView className="flex-1 bg-[#f5ebfc] p-4">
      <Textito className="text-3xl font-bold text-center text-[#81309b] my-6">Políticas de Privacidad y Seguridad</Textito>
      {privacyPolicies.map((item, index) => (
        <View key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
          <Textito className="text-2xl text-[#9a3ebb] mb-2" fontFamily="PoppinsBold">{item.title}</Textito>
          <Textito className="text-base text-gray-700">{item.content}</Textito>
        </View>
      ))}
      <View className="mb-12 bg-white p-4 rounded-lg shadow flex-col">
        <Textito className="text-2xl text-[#9a3ebb]" fontFamily="PoppinsBold">Última actualización:</Textito>
        <Textito className="text-2xl text-gray-700" fontFamily="PoppinsBold">07 Agosto de 2024</Textito>
      </View>
    </ScrollView>
  );
};

export default AvisosPrivacidad;
