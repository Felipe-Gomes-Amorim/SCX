import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { PacienteProvider } from "../../database/providers/paciente";
import { ILogs } from "../../database/models";
import { LogsProvider } from "../../database/providers/logs";
import nodemailer from 'nodemailer';

interface IparamProps {
    id?: number;
}
export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const email = async (req: Request<IparamProps>, res: Response) => {
    

   if (!req.params.id) {
    
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'o parametro id precisa ser informado'
        }
    });
   }

   const result = await PacienteProvider.getById(req.params.id);
   if (result instanceof Error) {
   
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
   }

    const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eduardo.darwich23@gmail.com',
    pass: 'yuiq sxsp bnjx inrh' // veja observação abaixo
  }
});


const enviarEmail = async () => {
  try {
    const info = await mailTransporter.sendMail({
      from: 'eduardo.darwih23@gmail.com',
      to: 'ineawebcomic@gmail.com',
      subject: 'Teste de envio',
      text: 'Este é um e-mail de teste enviado via Nodemailer',
      html: `sua senha é ${result.senha}`
    });

    console.log('Email enviado com sucesso:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};

enviarEmail();
            
        


            
   return res.status(StatusCodes.OK).json(result);
};