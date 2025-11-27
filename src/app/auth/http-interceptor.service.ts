import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import Swal from "sweetalert2";

//Está configurado para setar o token no cabeçalho de cada requisição automaticamente, exceto na rota Login
export const meuhttpInterceptor : HttpInterceptorFn = (request, next) => {
    let router = inject(Router); //Verifica em qual rota está
    let token = localStorage.getItem('token'); //Pega o token salvo no localStorage

    //Inclui o token do localStorage em cada requisição http (header)
    if(token && !router.url.includes('/login')){ //Se tem token E não está na tela de login, adiciona o token na requisição
        request = request.clone({ //A requisição original é imutável, então deve ser clonada para criar uma requisição modificada
            setHeaders: {Authorization: 'Bearer ' + token}, //Adiciona uma requisição uma etiqueta contendo o token
        });
    }

    //Aqui é feito todos os tratamentos do que o servidor retorna
    return next(request).pipe( //Essa requisição vai para o servidor e é esperado uma resposta. Pipe permite interceptar ou tratar erros
        catchError((err: any) => { //É como se fosse um try-catch, mas para respostas do servidor (captura erros HTTP, trata erros, etc)
            if(err instanceof HttpErrorResponse){ //Verificação do tipo do erro. Se sim, verifica o código. Se não, é um erro próprio do Angular

                if(err.status === 401){ //401 - UNAUTHORIZED. Token pode estar inválido, expirado, usuário não logado ou requisição sem token
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sessão expirada',
                        text: 'Faça login novamente',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    router.navigate(['/login']); //Usuário vai para a tela de login
                }else if(err.status === 403){ //403 - FORBIDDEN. Token é válido, mas o usuário não tem permissão para esse recurso
                    Swal.fire({
                        icon: 'error',
                        title: 'Acesso negado',
                        text: 'Você não tem permissão para isso',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    router.navigate(['/login']);
                }else{
                    console.error('HTTP error:', err); //Outros erros que não são 401 e 403, como por exemplo: 404, 500, 400, etc.
                }

            }else{ //Se o erro não for HTTP, como por exemplo: bug do Angular, erro de sintaxe, etc.
                console.error('An error occurred:', err);
            }

            return throwError(() => err); //Devolve o erro para quem chamou a requisição para que possa ser tratado lá também
        })
    );
}