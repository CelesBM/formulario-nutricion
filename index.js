const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const datos = new FormData(formulario);
  const objetoDatos = Object.fromEntries(datos.entries());

  let y = 10;

  doc.setFontSize(14);
  doc.text("Formulario Nutricional", 10, y);
  y += 10;

  doc.setFontSize(10);

  for (const key in objetoDatos) {
    const texto = `${key}: ${objetoDatos[key]}`;
    doc.text(texto, 10, y);
    y += 7;

    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  }

  // Descargar PDF automáticamente
  doc.save("formulario_nutricional.pdf");

  // Abrir WhatsApp con mensaje
  const numero = "5491155031316"; // formato internacional Argentina
  const mensaje = encodeURIComponent(
    "Hola Celeste, te envío mi formulario nutricional. Adjunto el PDF.",
  );

  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
});
