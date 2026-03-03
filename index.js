const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const datos = new FormData(formulario);

  // Manejo especial para checkboxes
  const comidasSeleccionadas = datos.getAll("comidasDia");

  const objetoDatos = Object.fromEntries(datos.entries());
  objetoDatos.comidasDia = comidasSeleccionadas.join(", ");

  // ===== PDF =====
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

  // Nombre del archivo
  let nombrePaciente = objetoDatos.nombre || "Paciente";

  nombrePaciente = nombrePaciente
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");

  doc.save(`Formulario_${nombrePaciente}.pdf`);

  // ===== WHATSAPP =====

  let mensaje = "FORMULARIO NUTRICIONAL\n\n";

  for (const key in objetoDatos) {
    if (objetoDatos[key] && objetoDatos[key].trim() !== "") {
      mensaje += `${key.toUpperCase()}:\n${objetoDatos[key]}\n\n`;
    }
  }

  const numero = "5491155031316";
  const mensajeCodificado = encodeURIComponent(mensaje);

  window.open(`https://wa.me/${numero}?text=${mensajeCodificado}`, "_blank");
});
