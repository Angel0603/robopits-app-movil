# RoboPits
# README - Enfoque Móvil - RoboPits

Proyecto RoboPits, Bina 13
Ingeniería en Desarrollo y Gestión de Software
10° B
- LARA BARRERA ANGEL DE JESUS
- BAUTISTA HERNANDEZ JESUS IVAN

## Descripción del Proyecto
Este proyecto es sobre el desarrollo de una aplicación eccomerce para dispositivos móviles, dedicada a la empresa RoboPits, ubicada en Huejutla de Reyes, Hgo. Esta aplicación móvil permitirá realizar compras de componentes electrónicos y realizar pedidos, además de poder visualizar todo el cátalogo de productos y categorias que tiene la empresa antes mencionada.

 **Objetivos**
1.	Facilitar la compra de productos: Permitir a los usuarios realizar compras de productos de manera fácil y rápida desde sus dispositivos móviles.
2.	Optimizar la experiencia del usuario (UX): Proveer una interfaz intuitiva, con navegación fluida y opciones de búsqueda para que los usuarios encuentren rápidamente los productos que necesitan.
3.	Gestionar el catálogo de productos: Mostrar un catálogo actualizado con imágenes, descripciones, precios y disponibilidad de productos.
4.	Implementar métodos de pago seguros: Integrar Stripe como pasarela de pagos, permitiendo al usuario comprar con tarjetas de crédito, debito y otras formas de pago.

**Alcance**
1.	Plataformas móviles: La app estará disponible para dispositivos Android.
2.	Interfaz de usuario amigable: Se priorizará el diseño de una interfaz sencilla que se adapte a las diferentes resoluciones de pantalla y dispositivos.
3.	Catálogo dinámico: Se actualizará en tiempo real para reflejar la disponibilidad de productos, promociones y nuevos lanzamientos.
4.	Integración con sistemas de inventario: La app se integrará con el backend del sistema de inventario para mantener la precisión en el stock disponible.

**Riesgos y Medidas**
1. Retrasos en el cronograma de desarrollo
•	Riesgo: El proyecto podría enfrentar retrasos debido a problemas técnicos, falta de recursos o cambios en los requisitos.
    •	Mitigación:
        o	Implementar una metodología ágil para ajustar prioridades y manejar mejor los cambios.
        o	Realizar revisiones periódicas para ajustar el cronograma según el progreso.
2. Problemas de integración con pasarelas de pago
•	Riesgo: La integración con servicios de pago como tarjetas de crédito, PayPal o Apple Pay podría fallar o no ser compatible con ciertas regiones.
    •	Mitigación:
        o	Realizar pruebas exhaustivas de la integración con todas las pasarelas de pago desde las primeras fases del desarrollo.
        o	Mantener un plan B con múltiples opciones de pago en caso de que una integración falle.
3. Incompatibilidad con diferentes dispositivos y versiones de sistemas operativos
•	Riesgo: La aplicación podría no funcionar correctamente en ciertos dispositivos o versiones de iOS y Android, limitando su adopción.
    •	Mitigación:
        o	Realizar pruebas en una amplia gama de dispositivos y versiones desde las primeras etapas del desarrollo.
        o	Utilizar herramientas como emuladores y dispositivos físicos para probar la compatibilidad en diferentes entornos.
        o	Mantener la app actualizada con las nuevas versiones de los sistemas operativos para asegurar su funcionamiento a largo plazo.

## Metodología
Para el desarrollo del proyecto se seleccionó la metodología XP (Extreme Programming) por sus siglas en inglés, también llamada Programación Extrema, la cual es considerada ágil, ya que su estructura facilita la creación de videojuegos, aplicaciones móviles y web, permite entregar proyectos de manera rápida y de gran calidad, además es compatible con Scrum. 

## Herramienta de control de versiones y flujo de trabajo
Para la gestión del código fuente y la colaboración entre los desarrolladores, se utilizará GitHub como plataforma de control de versiones. Esta herramienta facilita el control eficiente de las diferentes versiones de la aplicación, permitiendo a los desarrolladores realizar cambios, corregir errores y colaborar de manera simultánea. Además, GitHub asegura un flujo de trabajo organizado, lo que ayuda a mantener un código optimizado y preparado para su despliegue en producción.

## Estrategia de versionamiento y control de ramas
Estrategia de versionamiento Git Flow:
    •	Ramas principales:
        o	main o master: Contiene el código estable y listo para producción.
        o	develop: Rama donde se integran las nuevas funcionalidades antes de ser desplegadas en producción.
    •	Ramas de características (feature branches): Cada nueva funcionalidad se desarrollará en una rama separada y será fusionada en develop después de su revisión.
    •	Pull requests (PR): Todo cambio en el código debe ser gestionado mediante un pull request, lo que garantiza que el código sea revisado y aprobado antes de ser integrado.
    •	Versionado semántico (semver): Se aplicará la convención de versionado semántico siguiendo el formato MAJOR.MINOR.PATCH:
        o	MAJOR: Cambios incompatibles con versiones anteriores.
        o	MINOR: Nuevas características que no rompen la compatibilidad.
        o	PATCH: Corrección de errores o mejoras menores.
Integración con CI/CD:
    •	Se utilizará GitHub Actions u otra herramienta de CI/CD para automatizar pruebas y despliegues continuos a los entornos de staging o producción. Esto garantiza una integración constante y una entrega rápida de actualizaciones.

## Estrategia de versionamiento y control de ramas
Despliegue Automatizado
    Descripción: Utiliza herramientas de integración continua/despliegue continuo (CI/CD) como Jenkins, GitLab CI, CircleCI, o GitHub Actions para automatizar las pruebas y el despliegue de nuevas versiones de la aplicación.

**Entornos**
## Desarrollo:

Este entorno se utiliza para realizar pruebas locales en el ambiente de desarrollo de cada programador. Los desarrolladores verifican sus cambios en sus máquinas locales o en un entorno de desarrollo aislado antes de fusionarlos en la rama principal (main).
Un entorno de staging en la nube (por ejemplo, en Heroku o AWS) puede configurarse para probar las integraciones y el comportamiento de la aplicación antes del despliegue en producción.

## Producción:

Es el entorno donde la aplicación móvil está disponible para los usuarios finales.
Los cambios que superan las pruebas en el entorno de desarrollo y staging son desplegados automáticamente en este entorno.

**Proceso CI/CD**
## CI (Integración Continua):

Cada vez que se realiza un pull request o un push a la rama main, se activa un pipeline de CI que ejecuta un conjunto de pruebas automáticas usando plataformas como GitHub Actions o Jenkins.
Las pruebas validan que el nuevo código no interrumpa las funcionalidades existentes, incluyendo pruebas unitarias, pruebas de integración y pruebas de interfaz de usuario.
## CD (Despliegue Continuo):

Una vez que las pruebas son superadas y los cambios aprobados, se realiza un despliegue automático.
El despliegue incluye compilar la aplicación para iOS y Android, y publicar las actualizaciones sin interrupciones para los usuarios finales.

**Flujo de trabajo**
## Desarrollo:

Los desarrolladores realizan cambios localmente y crean una nueva rama para cada nueva funcionalidad o corrección.
Se ejecutan pruebas locales para asegurar que el nuevo código no introduce errores.
## Pull Request:

Una vez que el código está listo y probado localmente, se crea un pull request hacia la rama main.
El sistema de CI se activa automáticamente para ejecutar las pruebas automáticas.
## Revisión y Fusión:

Si las pruebas automáticas son exitosas, el pull request es revisado por otro miembro del equipo.
Tras la aprobación, los cambios se fusionan en la rama main.
## Despliegue Automático:

Con la fusión a main, se inicia el proceso de despliegue automático en el entorno de producción.
La aplicación se actualiza en tiempo real, estando disponible la nueva versión para todos los usuarios.

**Herramientas Usadas**
GitHub Actions/Jenkins: Para la integración y despliegue continuo.
GitHub: Para la gestión del código y el control de versiones.
Heroku/AWS: Para el manejo del entorno de staging y pruebas en la nube.

## Requisitos
- Framework: React
- Express.js (Node.js)
- Base de Datos: MongoDB
- Pasarela de Pagos: Stripe
- Control de Versiones: Git (GitHub)
- Entornos de Despliegue: Desarrollo, Staging, Producción

## Instalación

 **Clonar el Repositorio** 
 Para clonar el repositorio debemos de estar en el directorio donde queramos el codigo, despues ejecutaremos el siguiente comando:
 ```
 git clone https://github.com/Angel0603/robopits-app-movil.git
 cd robopits-app-movil
 ```

**Instalar Dependencias:**
El proyecto utiliza **Node.js** y **npm** para la gestión de dependencias. ADebemos asegurarnos de tener **Node.js** instalado antes de continuar.

Instala todas las dependencias del proyecto utilizando `npm`
 ```bash
 npm install
 ```
**Ejecución del proyecto:**
Una vez configuradas las dependencias, ejecutar el servidor local con el siguiente comando:
 ```bash
 npx expo start -c
 ```
Este comando iniciará el servidor local en el puerto definido (por defecto `8081`). Puedes acceder a la aplicación por medio del codigo QR escaneandolo con un dispositivo móvil:

Nota: Para que se ejecute la aplicación con el QR hay que tener instalada la app de Expo Go en nuestros dispositivos y estar conectado a la misma red WIFI tanto en el móvil como en la máquina donde se inicio el servidor local.
 ```bash
  http://localhost:8081/
 ```