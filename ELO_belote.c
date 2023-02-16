#include<stdio.h>
#include <stdlib.h>
#include<string.h>
#include<math.h>
#include <time.h>


typedef struct {    char nom[100];
                    int Elo;
                    int nb_match;
                    int nb_victoire;
                    int id;
                } joueur;

int inscrire_joueur(joueur, int, joueur*);
int reecrire_fichier(joueur*);
int affiche_classement(joueur*);
void permuter(joueur*, joueur*);
void triRapid(joueur tab[], int, int);
int rentrer_partie(int, int, int, int, int, joueur*);

int option=1,nb_joueurs,Elo_inscription,i=0, id_j1, id_j2, id_j3, id_j4, victoire, somme, h, min, s, day, mois, an;
joueur inscription, joueurs[80], joueurs_bis[80], joueur_modif;
char nom_save[100], date[30];
struct tm *local;
time_t now;

int rentrer_partie(int id_j1,int id_j2,int id_j3,int id_j4, int victoire, joueur *joueurs)
{
	int K=80, Elo_equipe1, Elo_equipe2;
	double delta_r;
  	double gain1, gain2;
  	Elo_equipe1 = joueurs[id_j1-1].Elo + joueurs[id_j2-1].Elo;
  	Elo_equipe2 = joueurs[id_j3-1].Elo + joueurs[id_j4-1].Elo;
  	
  	delta_r = Elo_equipe1 - Elo_equipe2;
  	gain1 = pow(10.0, -delta_r / 400.0);
  	gain1 = 1.0 / (1.0 + gain1);
	gain1 = K*(victoire - gain1);
	gain2 = pow(10.0, delta_r / 400.0);
  	gain2 = 1.0 / (1.0 + gain2);
	gain2 = K*(1-victoire - gain2);
	printf("%f %f\n", gain1, gain2);
    joueurs[id_j1-1].Elo += gain1/2; joueurs[id_j2-1].Elo += gain1/2; joueurs[id_j3-1].Elo += gain2/2; joueurs[id_j4-1].Elo += gain2/2;
    printf("%d %d %d %d\n", joueurs[id_j1-1].Elo, joueurs[id_j2-1].Elo, joueurs[id_j3-1].Elo, joueurs[id_j4-1].Elo);
    joueurs[id_j1-1].nb_match += 1; joueurs[id_j2-1].nb_match += 1; joueurs[id_j3-1].nb_match += 1; joueurs[id_j4-1].nb_match += 1;
    if (victoire == 1)
    {
        joueurs[id_j1-1].nb_victoire += 1; joueurs[id_j2-1].nb_victoire += 1;
    }
    if (victoire == 0)
    {
        joueurs[id_j3-1].nb_victoire += 1; joueurs[id_j4-1].nb_victoire += 1;
    }
    
    reecrire_fichier(joueurs);
}







void permuter(joueur *a, joueur *b) {
    joueur tmp;
    tmp = *a;
    *a = *b;
    *b = tmp;
}
 
int inscrire_joueur(joueur inscription, int Elo_inscription, joueur* joueurs)
{
    FILE *F_app;
    F_app = fopen("Elo_belote.txt", "a"); 
    if (F_app==NULL)
    {   printf("Erreur a l'ouverture du fichier"); return -2;}
    nb_joueurs++;
    inscription.Elo = Elo_inscription;
    inscription.nb_match = 0;
    inscription.nb_victoire = 0;
    inscription.id = nb_joueurs;
    fprintf(F_app, "%s %d %d %d %d", inscription.nom, Elo_inscription, 0, 0, nb_joueurs);
    joueurs[nb_joueurs-1] = inscription;
    fclose(F_app);
    reecrire_fichier(joueurs);
    return 0;
}

int reecrire_fichier(joueur* joueurs)
{
    FILE *F_out;
    F_out = fopen("Elo_belote.txt", "w");
    if (F_out==NULL)
    {   printf("Erreur a l'ouverture du fichier"); return -2;}
    fprintf(F_out, "%d %d\n", nb_joueurs, Elo_inscription);
    for (i=0;i<nb_joueurs;i++)
    {
        fprintf(F_out, "%s %d %d %d %d\n", (joueurs[i]).nom, (joueurs[i]).Elo, (joueurs[i]).nb_match, (joueurs[i]).nb_victoire, (joueurs[i]).id);
    }
    fclose(F_out);
    return 0;
}

int affiche_classement(joueur* joueurs)
{
    FILE *F_classement;
    memcpy(joueurs_bis, joueurs, nb_joueurs*sizeof(joueur));
    triRapid(joueurs_bis, 0, nb_joueurs-1);
    F_classement = fopen("ELO_belote_classe.txt", "w");
    fprintf(F_classement,"%d\n",nb_joueurs);
    for (i=0;i<nb_joueurs;i++)
    {
    	printf("%d : %s avec %d d'Elo\n", nb_joueurs-(i), joueurs_bis[i].nom, joueurs_bis[i].Elo);
        fprintf(F_classement,"%s %d\n", joueurs_bis[nb_joueurs-(i)-1].nom, joueurs_bis[nb_joueurs-(i)-1].Elo);
    }
    return 0;
}

void triRapid(joueur tab[], int first, int last) {
    int pivot, i, j;
    if(first < last) {
        pivot = first;
        i = first;
        j = last;
        while (i < j) {
            while(tab[i].Elo <= tab[pivot].Elo && i < last)
                i++;
            while(tab[j].Elo > tab[pivot].Elo)
                j--;
            if(i < j) {
                permuter(&(tab[i]), &(tab[j]));
            }
        }
        permuter(&(tab[pivot]), &(tab[j]));
        triRapid(tab, first, j - 1);
        triRapid(tab, j + 1, last);
    }
}

int main()
{
    FILE *F_in, *F_save;
    F_in = fopen("Elo_belote.txt", "r");
    if (F_in==NULL)
    {   printf("Erreur a l'ouverture du fichier"); return -2;}
    fscanf(F_in, "%d %d", &nb_joueurs, &Elo_inscription);
    printf("Nombre de joueurs: %d\nElo initial à l'inscription :%d\n", nb_joueurs, Elo_inscription);
    while (fscanf(F_in, "%s %d %d %d %d", (joueurs[i]).nom, &((joueurs[i]).Elo), &((joueurs[i]).nb_match), &((joueurs[i]).nb_victoire), &((joueurs[i]).id)) != EOF )
    {
        printf("(%d) %s | Elo : %d  | Nb de matchs : %d | Nb de victoires :  %d\n", (joueurs[i]).id, (joueurs[i]).nom, (joueurs[i]).Elo, (joueurs[i]).nb_match, (joueurs[i]).nb_victoire);
        i++;
    }
    fclose(F_in);

    while (option!=0)
    {
        printf("->(1) Pour inscrire un joueur\n->(2) Pour rentrer une partie\n->(3) Pour regarder et mettre à jour le classement actuel\n->(4) Pour changer l'Elo initial a l'inscription\n->(5) Voir la somme des Elo\n->(6) Voir les id des joueurs\n->(7) Modifier un joueur\n->(0) Pour stop le programme\n");
        scanf("%d",&option);
        if (option==1)
        {
            printf("Entrez nom du joueur (Prenom et initial nom de famille)\n");
            scanf("%s",inscription.nom);
            inscrire_joueur(inscription, Elo_inscription, joueurs);
            
        }
        if (option==2)
        {
            printf("rentrer l'id du joueur 1 : ");
            scanf("%d",&id_j1);
            printf("\nayant joué avec le joueur 2 : ");
            scanf("%d",&id_j2);
            printf("\ncontre le joueur 3 : ");
            scanf("%d",&id_j3);
            printf("\net le joueur 4 : ");
            scanf("%d",&id_j4);
            printf("%s et %s VS %s et %s\n", joueurs[id_j1-1].nom, joueurs[id_j2-1].nom, joueurs[id_j3-1].nom, joueurs[id_j4-1].nom);
            printf("\nLe joueur 1 et 2 ont gagné(1) ? perdu(0) ?\n");
            scanf("%d",&victoire);
            rentrer_partie(id_j1, id_j2, id_j3, id_j4, victoire, joueurs);
        }
        if (option==3)
        {
            affiche_classement(joueurs);
        }
        if (option==4)
        {
            printf("Quel est le nouveau Elo initial ?");
            scanf("%d",&Elo_inscription);
            reecrire_fichier(joueurs);
        }
        if (option==5)
        {
            somme = 0;
            for (i=0;i<nb_joueurs;i++)
            {
    	        somme += joueurs[i].Elo;
            }
            printf("Somme des Elo de tout le monde : %d\n",somme);
        }
        if (option==6)
        {
            for (i=0;i<nb_joueurs;i++)
            {
    	        printf("(%d) %s\n", joueurs[i].id, joueurs[i].nom);
            }
        }
        if (option == 7)
        {
            printf("Quel est l'id du joueur a modifier ?\n");
            scanf("%d",&joueur_modif.id);
            printf("Nom ?");
            scanf("%s",joueur_modif.nom);
            printf("Elo ?");
            scanf("%d",&joueur_modif.Elo);
            printf("Nb de matchs ?");
            scanf("%d",&joueur_modif.nb_match);
            printf("Nb de victoires ?");
            scanf("%d",&joueur_modif.nb_victoire);
            joueurs[joueur_modif.id-1]=joueur_modif;
            reecrire_fichier(joueurs);
        }
    }
    time(&now);
    local = localtime(&now);
    h = local->tm_hour;        
    min = local->tm_min;       
    s = local->tm_sec;
    day = local->tm_mday;          
    mois = local->tm_mon + 1;     
    an = local->tm_year + 1900;
    sprintf(date,"%d_%d_%d_%d_%d_%d", day, mois, an, h+2, min, s);
    strcat(nom_save,"./save/Elo_");
    strcat(nom_save,date);
    strcat(nom_save,".txt");
    printf("%s\n", nom_save);
    F_save = fopen(nom_save, "w");
    if (F_save==NULL)
    {   printf("Erreur a l'ouverture du fichier"); return -2;}
    fprintf(F_save, "%d %d\n", nb_joueurs, Elo_inscription);
    for (i=0;i<nb_joueurs;i++)
    {
        fprintf(F_save, "%s %d %d %d %d\n", (joueurs[i]).nom, (joueurs[i]).Elo, (joueurs[i]).nb_match, (joueurs[i]).nb_victoire, (joueurs[i]).id);
    }
    fclose(F_save);
    
    return 0;
}
