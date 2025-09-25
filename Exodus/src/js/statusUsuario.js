const statusDiv = document.querySelector('.status-usuario');
const secretariasDiv = document.querySelector('.status-secretaria');
const medicosDiv = document.querySelector('.status-medico');
const admsDiv = document.querySelector('.status-adm');
const labsDiv = document.querySelector('.status-laboratorio');

const token = localStorage.getItem('token');
const nome = localStorage.getItem('nome'); 
const role = localStorage.getItem('role');

if (token && nome) {
    secretariasDiv.innerHTML = '';
    medicosDiv.innerHTML = '';
    admsDiv.innerHTML = '';
    labsDiv.innerHTML = '';
    console.log('Token JWT:', token);
    //ADM
    if(role=="adm") statusDiv.innerHTML = `<a href="adiministracao.html" class="textHeader2"> Bem-vindo, ${nome}! </a>`;
    
    //SECRETARIA
    if(role=="secretaria") statusDiv.innerHTML = `<a href="secretaria.html" class="textHeader2"> Bem-vindo, ${nome}! </a>`;


    //PACIENTE
    if(role=="paciente") statusDiv.innerHTML = `<a href="perfil.html" class="textHeader2"> Bem-vindo, ${nome}! </a>`;
    
    
    //MEDICO
    if(role=="medico") statusDiv.innerHTML = `<a href="perfil.html" class="textHeader2"> Bem-vindo, ${nome}! </a>`;

    //LABORATORIO
    if(role=="laboratorio") statusDiv.innerHTML = `<a href="exames_paciente.html" class="textHeader2"> Bem-vindo, ${nome}! </a>`;

} else {
    //DESLOGADO
    statusDiv.innerHTML = `
    <a href="login.html" class="textHeader2">Faça login</a>
    `;
    secretariasDiv.innerHTML = `
    <a href="login_secretaria.html" class="textHeader2">Secretaria</a>
    `;
    medicosDiv.innerHTML = `
    <a href="login_medico.html" class="textHeader2">Médico</a>
    `;
    admsDiv.innerHTML = `
    <a href="login_adm.html" class="textHeader2">Administração</a>
    `;
    labsDiv.innerHTML = `
    <a href="login_laboratorio.html" class="textHeader2">Laboratório</a>
    `;
}
