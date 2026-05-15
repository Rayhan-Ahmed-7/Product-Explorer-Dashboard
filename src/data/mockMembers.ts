export interface Member {
    id: string;
    member: {
        name: string;
        id: string;
        avatar: string;
    };
    family: boolean;
    clubOrganisations: {
        primary: {
            name: string;
            logo: string;
        };
        extraCount: number;
    };
    roles: string[];
    extraRolesCount: number;
    clubMemberships: {
        type: string;
        statusText: string;
        status: 'valid' | 'suspended' | 'expired' | 'none';
    };
    contactInfo?: {
        email: string;
        phone: string;
    };
    joinDate?: string;
}

const firstNames = ['Brooklyn', 'Kathryn', 'Cody', 'Dianne', 'Jacob', 'Esther', 'Eleanor', 'Arlene', 'Wade', 'Jane', 'Guy', 'Robert', 'Bessie', 'Cameron', 'Courtney', 'Devon', 'Ronald', 'Albert', 'Marvin', 'Jerome'];
const lastNames = ['Simmons', 'Murphy', 'Fisher', 'Russell', 'Jones', 'Howard', 'Pena', 'McCoy', 'Warren', 'Cooper', 'Hawkins', 'Fox', 'Williamson', 'Henry', 'Lane', 'Richards', 'Flores', 'Watson', 'Bell', 'Nguyen'];
const clubNames = ['1066 Gymnastics', '776 Gymnastics Mansfield', 'AAAsports', 'AB FAB Gymnastics', 'Abbey Gym Club', 'Acme Gymnastics', 'Star Athletics', 'Elite Gym', 'Gravity Club', 'Velocity Gym', 'Peak Performance', 'Sky High', 'Gymnastics Zone'];
const roles = ['Club Coaching Off...', 'Coach of Children', 'COVID Officer', 'Member', 'Coach', 'President', 'Safeguarding Officer', 'Volunteer'];
const membershipTypes = ['Staff', 'Community', 'Competitive', 'National', 'Enhanced', 'Sports Support Services', 'Partner Coach'];
const statuses: Array<'valid' | 'suspended' | 'expired' | 'none'> = ['valid', 'suspended', 'expired', 'none'];

const generateMember = (index: number): Member => {
    const idNum = 100000 + index;
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[index % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const club = clubNames[index % clubNames.length];
    const status = statuses[index % statuses.length];
    
    return {
        id: (index + 1).toString(),
        member: {
            name,
            id: idNum.toString(),
            avatar: `https://i.pravatar.cc/150?u=${firstName.toLowerCase()}${index}`,
        },
        family: index % 3 === 0,
        clubOrganisations: {
            primary: { 
                name: index % 5 === 0 ? 'No Organisation' : club, 
                logo: index % 5 === 0 ? '' : '/logo/justgo.svg' 
            },
            extraCount: index % 4,
        },
        roles: roles.slice(0, (index % 3) + 1),
        extraRolesCount: index % 2 === 0 ? 0 : index % 5,
        clubMemberships: {
            type: status === 'none' ? 'No Membership' : membershipTypes[index % membershipTypes.length],
            statusText: status === 'valid' ? 'Expires on 26 Nov 2027' : status === 'suspended' ? `${index + 5} Days Ago` : status === 'expired' ? 'Expired' : '',
            status,
        },
        contactInfo: {
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            phone: `(555) ${index + 100}-${index + 1000}`,
        },
        joinDate: `${index + 1} Jan 202${index % 5}`,
    };
};

export const mockMembers: Member[] = Array.from({ length: 2000 }, (_, i) => generateMember(i));
